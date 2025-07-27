import argparse
import logging
import re
import subprocess
import sys

MAX_LINE_LENGTH = 72
FULL_SHA1_LENGTH = 40

def get_latest_commit_message() -> str:
    result = subprocess.run(
        ["git", "log", "-1", "--pretty=%B"],
        capture_output=True,
        check=False,
        text=True,
    )
    if result.returncode != 0:
        return ""
    return result.stdout.strip()

def sha1_exists(sha1: str) -> bool:
    result = subprocess.run(
        ["git", "cat-file", "-e", sha1],
        capture_output=True,
        check=False,
    )
    return result.returncode == 0

def parse_flags() -> list[bool]:
    parser = argparse.ArgumentParser(
        description="Check commit message for bugfix and length rules."
    )
    parser.add_argument("--bugfix_check",
                        action="store_true",
                        help="Enable bugfix commit checks")

    parser.add_argument("--length",
                        action="store_true",
                        help="Enable commit message length check")

    parser.add_argument("--body_must_present",
                        action="store_true",
                        help="Require commit body to be present")

    args = parser.parse_args()
    args: list[bool] = [args.bugfix_check, args.length, args.body_must_present]
    # If no flags are set, enable all
    return args if any(args) else [True] * len(args)

def _ignore_line(line: str):
    allowed_patterns = [
        r"^Merge [0-9a-fA-F]{40} into [0-9a-fA-F]{40}$",
        r"^Signed-off-by: .+ <.+>$",
    ]
    return any(re.match(pattern, line.strip()) for pattern in allowed_patterns)

def _check_length(title: str, body: str) -> list[str]:
    errors = []
    title_to_check = title

    # If it's a revert, ignore the "Revert" prefix and the following colon/space
    if title_to_check.lower().startswith("revert"):
        # Remove "Revert" and any following colon/space
        title_to_check = re.match(r'Revert:\s*"(.*)"', title_to_check, re.IGNORECASE)
        title_to_check = title_to_check.group(1) if title_to_check else title

    if len(title_to_check) > MAX_LINE_LENGTH:
        errors.append(
            f"Commit title exceeds {MAX_LINE_LENGTH} characters "
            "(excluding the 'Revert' prefix, if present)."
        )

    if any(len(line) > MAX_LINE_LENGTH and not _ignore_line(line) for line in body.splitlines()):
        errors.append(f"Commit body line exceeds {MAX_LINE_LENGTH} characters.")

    return errors

def _check_bugfix_title(title: str, body: str) -> list[str]:
    errors = []
    contains_fix = re.search(r"\bfix\b", title, re.IGNORECASE)
    if contains_fix and not title.startswith("[BUGFIX]"):
        errors.append("Title contains 'fix' but does not start with [BUGFIX]")

    if title.startswith("[BUGFIX]") or contains_fix:
        match = re.search(fr"fixes=(unknown|[0-9a-fA-F]{{{FULL_SHA1_LENGTH}}})", body)
        if not match:
            errors.append("[BUGFIX] commit must have 'fixes=unknown' or 'fixes=sha1' in the body")

        sha1 = re.search(fr"fixes=([0-9a-fA-F]{{{FULL_SHA1_LENGTH}}})", body)
        sha1 = sha1.group(1) if sha1 else None

        if sha1 and len(sha1) < FULL_SHA1_LENGTH:
            errors.append("fixes=sha1 must be a full sha1, not a short one")
        elif sha1 and not sha1_exists(sha1):
            errors.append(f"sha1={sha1} does not exist in this repository")

    return errors

def _check_body_must_present(body: str) -> list[str]:
    errors = []
    body = body.strip()

    # Remove "Signed-off-by" and "fixes=" lines from the body before checking presence
    body = "\n".join(
        line for line in body.splitlines()
        if not re.match(r"^\s*(Signed-off-by:|fixes=)", line, re.IGNORECASE)
    ).strip()

    # Remove empty lines
    body = "\n".join(line for line in body.splitlines() if line.strip())

    if not body:
        errors.append("Commit body must be present.")

    return errors

def _extract_title_body(commit_msg: str) -> tuple[str, str]:

    title = ""
    title_index = 0
    lines = commit_msg.splitlines()

    for i, line in enumerate(lines):
        if not _ignore_line(line):
            title = line
            title_index = i
            break

    body = "\n".join(lines[title_index + 1:]).strip() if title_index + 1 < len(lines) else ""
    return title, body


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

    errors = []
    bugfix_check, length_check, body_must_present = parse_flags()
    commit_msg = get_latest_commit_message()
    if not commit_msg:
        errors.append("Unable to get commit message.")
        print_errors_and_exit(errors)

    lines = commit_msg.splitlines()
    if not lines:
        errors.append("Commit message is empty.")
        print_errors_and_exit(errors)

    title, body = _extract_title_body(commit_msg)
    if title is None:
        errors.append("No valid title found in commit message.")
        print_errors_and_exit(errors)


    if body_must_present:
        new_errors = _check_body_must_present(body)
        errors.extend(new_errors)

    if length_check:
        new_errors = _check_length(title, body)
        errors.extend(new_errors)

    if bugfix_check:
        new_errors = _check_bugfix_title(title, body)
        errors.extend(new_errors)

    print_errors_and_exit(errors)

def print_errors_and_exit(errors) -> None:
    if errors:
        for error in errors:
            logging.error(error)
        sys.exit(1)
    else:
        logging.info("Commit message is valid.")

if __name__ == "__main__":
    main()

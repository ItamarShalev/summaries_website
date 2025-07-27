# 1. Use the official uv+python image as base
FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim

# 2. Set working directory
WORKDIR /app

# 3. Compile .pyc for speed, and set uv link mode for Docker
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy

# 4. Install dependencies using only lockfiles for deterministic builds
COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-install-project --no-dev

# 5. Copy app source *after* deps, for better Docker layer caching
COPY . .

# 6. Install the actual project, still without dev dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-dev

# 7. Fix: uv creates .venv, ensure bin dir is prioritized
ENV PATH="/app/.venv/bin:$PATH"

# 8. Don't inherit uv's entrypoint
ENTRYPOINT []

# 9. (Optional but recommended) Use a non-root user for security (if app permits)
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# 10. Expose FastAPI's port
EXPOSE 8000

# 11. Run fastapi as the web server!
CMD ["fastapi", "dev", "main.py", "--host", "0.0.0.0", "--port", "8000" ]

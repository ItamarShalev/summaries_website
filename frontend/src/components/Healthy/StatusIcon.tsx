import React from "react";
import styles from "@/components/Healthy/Healthy.module.css";

interface Props {
  type: "loading" | "success" | "error";
}

const StatusIcon: React.FC<Props> = ({ type }) => {
  if (type === "loading") {
    return (
      <div className={styles.healthyIcon}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#a5b4fc" />
          <circle cx="12" cy="12" r="6" fill="#fff" />
        </svg>
      </div>
    );
  }

  if (type === "success") {
    return (
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="12"
          fill="#4CAF50"
        />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#F44336" />
      <path
        d="M8 8l8 8M16 8l-8 8"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StatusIcon;

import React, { useEffect, useState } from "react";
import styles from "@/components/Healthy/Healthy.module.css";
import StatusIcon from '@/components/Healthy/StatusIcon'; 
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const Healthy: React.FC = () => {
  const { t } = useTranslation();
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null); 

  const checkHealth = () => {
    fetch(`${API_URL}/healthy/`)
      .then((res: Response) => res.json())
      .then((data: { status: boolean }) => setIsHealthy(data.status === true))
      .catch(() => setIsHealthy(false));
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 1000);
    return () => clearInterval(interval);
  }, []);

  let message = "";
  let statusClass = "";
  let iconType: "loading" | "success" | "error" = "loading";

  if (isHealthy === null) {
    message = t("healthy.loading");
    statusClass = styles["healthyHeading--checking"];
    iconType = "loading";
  } else if (isHealthy) {
    message = t("healthy.success");
    statusClass = styles["healthyHeading--success"];
    iconType = "success";
  } else {
    message = t("healthy.error");
    statusClass = styles["healthyHeading--error"];
    iconType = "error";
  }

  return (
    <div className={styles.healthyContainer}>
      <div className={styles.healthyCard}>
        <StatusIcon type={iconType} />
        <h2 className={`${styles.healthyHeading} ${statusClass}`}>{message}</h2>
      </div>
    </div>
  );
};

export default Healthy;

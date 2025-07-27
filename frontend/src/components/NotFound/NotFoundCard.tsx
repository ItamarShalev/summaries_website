import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "@/components/NotFound/NotFoundCard.module.css";

const NotFoundCard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>{t("not_found.title")}</h2>
        <p className={styles.description}>{t("not_found.description")}</p>
        <Link to="/" className={styles.link}>
          {t("not_found.button")}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundCard;

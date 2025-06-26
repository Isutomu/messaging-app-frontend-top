// 3rd Party Modules
import { useNavigate } from "react-router-dom";

// Local Modules
import styles from "./index.module.css";
import { Button } from "../../components/Button";

// Exportable Component
export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Page Not Found</h1>
      <p className={styles.text}>Well, we all lose our ways sometimes...</p>
      <Button name="Go To Homepage" onClick={() => navigate("/")} />
    </main>
  );
};

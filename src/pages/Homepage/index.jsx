// 3rd Party Modules
import { Outlet, useLocation } from "react-router-dom";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

// Local Modules
import { Menu } from "../../containers/Menu";
import { useFetchRequest } from "../../lib/hooks/useFetchRequest";
import styles from "./index.module.css";

export const Homepage = () => {
  const location = useLocation();
  const { data, error, loading } = useFetchRequest(
    import.meta.env.VITE_API_URL + "/friends",
  );

  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <Menu friends={data?.data.friends} />
        {location.pathname === "/app" ? (
          <div className={styles.iconDiv}>
            <BiSolidMessageRoundedDetail size="10rem" />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </main>
  );
};

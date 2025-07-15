// 3rd Party Modules
import { Outlet, useLocation } from "react-router-dom";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";

// Local Modules
import { Menu } from "../../containers/Menu";
import styles from "./index.module.css";
import { Loading } from "../../components/Loading";
import { fetchRequest } from "../../lib/fetchRequest";

export const Homepage = () => {
  const location = useLocation();
  const { isPending, data: friendsResponse } = useQuery({
    queryKey: ["friends"],
    queryFn: () => fetchRequest(import.meta.env.VITE_API_URL + "/friends"),
  });

  return (
    <main className={styles.main}>
      <Loading loading={isPending} />
      <div className={styles.div}>
        <Menu friends={friendsResponse?.data.friends} />
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

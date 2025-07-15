// 3rd Party Modules
import { useNavigate, useSearchParams } from "react-router-dom";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

// Local Modules
import styles from "./index.module.css";
import { useFetchRequest } from "../../lib/hooks/useFetchRequest";
import { Header } from "../../components/Header";
import { IoPersonAddSharp } from "react-icons/io5";
import { fetchRequest } from "../../lib/fetchRequest";
import { Button } from "../../components/Button";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search_term");
  const navigate = useNavigate();
  const { data, error, loading } = useFetchRequest(
    import.meta.env.VITE_API_URL + `/search?search_term=${searchTerm}`,
  );

  const searchResults = data?.data.searchResults;
  const handleClick = (user) => {
    if (user.friend) {
      navigate(`/app/chat/${user.username}`);
    } else {
      fetchRequest(import.meta.env.VITE_API_URL + `/friends/${user.username}`, {
        method: "POST",
      }).then((data) => {
        if (data.status === "error") {
          notificationContext.setError(data.message);
        } else {
          navigate("/app");
        }
      });
    }
  };

  return (
    <section className={styles.mainSection}>
      <Header title={`Search Results for: ${searchTerm}`} />
      <ul className={styles.resultsDiv}>
        {searchResults &&
          searchResults.map((user) => (
            <li key={user.username} className={styles.result}>
              <span>{user.username}</span>
              <Button
                onClick={() => handleClick(user)}
                padding="var(--padding-xs) var(--padding-lg)"
              >
                {user.friend ? (
                  <BiSolidMessageRoundedDetail size="1.3rem" />
                ) : (
                  <IoPersonAddSharp size="1.3rem" />
                )}
              </Button>
            </li>
          ))}
      </ul>
    </section>
  );
};

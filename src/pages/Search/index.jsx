// 3rd Party Modules
import { useNavigate, useSearchParams } from "react-router-dom";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";

// Local Modules
import styles from "./index.module.css";
import { Header } from "../../components/Header";
import { IoPersonAddSharp } from "react-icons/io5";
import { fetchRequest } from "../../lib/fetchRequest";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search_term");
  const navigate = useNavigate();
  const {
    isPending: loading,
    data,
    error,
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () =>
      fetchRequest(
        import.meta.env.VITE_API_URL + `/search?search_term=${searchTerm}`,
      ),
  });

  const searchResults = data?.data.searchResults;
  const handleClick = (user) => {
    if (user.friend) {
      navigate(`/app/chat/${user.username}`);
    } else {
      fetchRequest(import.meta.env.VITE_API_URL + `/friends/${user.username}`, {
        method: "POST",
      }).then((data) => {
        if (data.status === "error") {
          errorContext.setError(data.message);
        } else {
          navigate("/app");
        }
      });
    }
  };

  return (
    <>
      <Loading loading={loading} />
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
    </>
  );
};

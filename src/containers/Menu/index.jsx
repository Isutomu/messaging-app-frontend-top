// 3rd Party Modules
import PropTypes from "prop-types";
import {
  IoIosLogOut,
  IoMdPeople,
  IoMdPerson,
  IoMdSettings,
} from "react-icons/io";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";

// Local Modules
import styles from "./index.module.css";
import { Button } from "../../components/Button";
import { ErrorContext } from "../../routes/App";
import { fetchRequest } from "../../lib/fetchRequest";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const errorContext = useContext(ErrorContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/app/search?search_term=${searchTerm}`);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > 20) {
      setSearchTerm(value.slice(0, 20));
      if (!errorDisplayed) {
        setErrorDisplayed(true);
        errorContext.setError("Search term must be less than 20 chars");
      }
      return;
    }

    setSearchTerm(value);
  };

  return (
    <div className={styles.searchBar}>
      <h2>Search</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search for..."
          value={searchTerm}
          onChange={handleChange}
        />
        <Button type="submit" padding="0.125rem">
          <HiMagnifyingGlass size="1.3rem" />
        </Button>
      </form>
    </div>
  );
};

const Friends = ({ friends }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Friends</h2>
      <ul className={styles.friendsDiv}>
        {friends &&
          friends.map((friend) => (
            <li
              key={friend.username}
              className={styles.friend}
              onClick={() => navigate(`/app/chat/${friend.username}`)}
            >
              <Button name={friend.username}>
                <IoMdPerson size="1.2rem" />
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

const SettingsButtons = () => {
  const errorContext = useContext(ErrorContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetchRequest(import.meta.env.VITE_API_URL + "/logout", {
      method: "POST",
    }).then((data) => {
      if (data.status === "error") {
        errorContext.setError(data.message);
      } else {
        navigate("/login");
      }
    });
  };

  return (
    <div className={styles.settingsDiv}>
      <Button name="New Group">
        <IoMdPeople size="1.5rem" onClick={() => navigate("/app/new-group")} />
      </Button>
      <span className={styles.smallerButton}>
        <Button name="Settings" onClick={() => navigate("/app/settings")}>
          <IoMdSettings size="1.4rem" />
        </Button>
      </span>
      <span className={styles.smallerButton}>
        <Button name="Logout" onClick={handleLogout}>
          <IoIosLogOut size="1.4rem" />
        </Button>
      </span>
    </div>
  );
};

export const Menu = ({ friends = [] }) => {
  return (
    <section className={styles.section}>
      <div className={styles.searchFriendsDiv}>
        <Search />
        <Friends friends={friends} />
      </div>
      <SettingsButtons />
    </section>
  );
};

Menu.propTypes = {
  frieds: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
    }),
  ).isRequired,
};

Friends.propTypes = {
  frieds: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
    }),
  ).isRequired,
};

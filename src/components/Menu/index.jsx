// 3rd Party Modules
import PropTypes from "prop-types";
import {
  IoIosLogOut,
  IoMdPeople,
  IoMdPerson,
  IoMdSettings,
} from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Local Modules
import styles from "./index.module.css";
import { Button } from "../Button";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.searchBar}>
      <h2>Search</h2>
      <Button
        name="search"
        onClick={() => navigate(`/app/search?search_query=${searchTerm}`)}
      >
        <IoMdPerson />
      </Button>
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
  const navigate = useNavigate();

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
        <Button name="Logout" onClick={() => navigate("/app/logout")}>
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

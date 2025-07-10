// 3rd Party Modules
import { useNavigate, useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";

// Local Modules
import styles from "./index.module.css";

const mockMessages = [
  {
    username: "testFriendLogin2",
    message:
      "lollollollollollollol lollol lollollollol loldlo lollollollollollollol lollollollollollollol",
    id: "1",
  },
  { username: "testFriendLogin2", message: "t1", id: "2" },
  { username: "username", message: "test", id: "3" },
  { username: "testFriendLogin2", message: "test test", id: "4" },
];
const TriangleLeft = () => (
  <svg
    className={styles.svgLeft}
    height="8"
    width="8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon className={styles.polygon} points="0,0 8,0 8,8" />
  </svg>
);
const TriangleRight = () => (
  <svg
    className={styles.svgRight}
    height="8"
    width="8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon className={styles.polygon} points="0,0 0,8 8,0" />
  </svg>
);

export const Chat = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const messages = mockMessages;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.mainSection}>
      <header className={styles.header}>
        <span>{username}</span>
        <button
          className={`${styles.button} ${styles.closeButton}`}
          onClick={() => navigate("/app")}
        >
          X
        </button>
      </header>

      <section className={styles.messagesSection}>
        {messages &&
          messages.map((message) => {
            const received = message.username === username;

            return (
              <span
                key={message.id}
                className={`${styles.message} ${
                  received ? styles.messageReceived : styles.messageSent
                }`}
              >
                {received ? <TriangleLeft /> : <TriangleRight />}
                {message.message}
              </span>
            );
          })}
      </section>

      <form className={styles.inputsSection} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type your message"
        />
        <button
          className={`${styles.button} ${styles.sendButton}`}
          type="submit"
        >
          <IoSend size="1.3rem" />
        </button>
      </form>
    </section>
  );
};

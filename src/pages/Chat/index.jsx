// 3rd Party Modules
import { useNavigate, useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useContext, useState } from "react";

// Local Modules
import styles from "./index.module.css";
import { useFetchRequest } from "../../lib/hooks/useFetchRequest";
import { fetchRequest } from "../../lib/fetchRequest";
import { NotificationContext } from "../../routes/App";
import { Header } from "../../components/Header";

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
  const [inputMessage, setInputMessage] = useState("");
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const navigate = useNavigate();
  const notificationContext = useContext(NotificationContext);
  const params = useParams();
  const friendUsername = params.username;
  const { data, error, loading } = useFetchRequest(
    import.meta.env.VITE_API_URL + `/messages/${friendUsername}`,
  );

  const messages = data?.data.messages;
  const handleSubmit = (e) => {
    e.preventDefault();

    fetchRequest(import.meta.env.VITE_API_URL + `/messages/${friendUsername}`, {
      method: "POST",
      body: { message: inputMessage },
    }).then((data) => {
      if (data.status === "error") {
        notificationContext.setError(data.message);
      } else {
        setInputMessage("");
        navigate(`/app`);
      }
    });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > 130) {
      setInputMessage(value.slice(0, 130));
      if (!errorDisplayed) {
        setErrorDisplayed(true);
        notificationContext.setError("Message must be less than 130 chars");
      }
      return;
    }

    setInputMessage(value);
  };

  return (
    <section className={styles.mainSection}>
      <Header title={friendUsername} />

      <section className={styles.messagesSection}>
        {messages &&
          messages.map((message) => {
            const received = message.sender === friendUsername;

            return (
              <span
                key={message.id}
                className={`${styles.message} ${
                  received ? styles.messageReceived : styles.messageSent
                }`}
              >
                {received ? <TriangleLeft /> : <TriangleRight />}
                {message.content}
              </span>
            );
          })}
      </section>

      <form className={styles.inputsSection} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type your message"
          value={inputMessage}
          onChange={handleChange}
        />
        <button className={styles.button} type="submit">
          <IoSend size="1.3rem" />
        </button>
      </form>
    </section>
  );
};

// 3rd Party Modules
import { useNavigate, useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { socket } from "../../lib/socket";

// Local Modules
import styles from "./index.module.css";
import { fetchRequest } from "../../lib/fetchRequest";
import { ErrorContext } from "../../routes/App";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { UserContext } from "../../routes/ProtectedRoute";

// Container exclusive components
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
  const [messages, setMessages] = useState([]);
  const errorContext = useContext(ErrorContext);
  const params = useParams();
  const chatId = params.chatId;
  const userContext = useContext(UserContext);
  const {
    isPending: loading,
    data,
    error,
  } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetchRequest(import.meta.env.VITE_API_URL + `/messages/${chatId}`),
  });

  useEffect(() => {
    socket.emit("join room", { chatId });
    return () => {
      socket.emit("leave room", { chatId });
    };
  }, [chatId]);

  useEffect(() => {
    if (data?.data.chat.messages) {
      setMessages(data?.data.chat.messages);
    }
  }, [data]);

  useEffect(() => {
    socket.on("receive message", (data) => {
      setMessages((prev) => {
        if (!prev.find((message) => message.id === data.message.id)) {
          return [...prev, data.message];
        }
        return prev;
      });
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputMessage === "") {
      errorContext.setError("Can't send an empty message");
      return;
    }

    fetchRequest(import.meta.env.VITE_API_URL + `/messages/${chatId}`, {
      method: "POST",
      body: { message: inputMessage },
    }).then((data) => {
      if (data.status === "error") {
        errorContext.setError(data.message);
      } else {
        socket.emit("send message", { chatId, message: data.message });
        setInputMessage("");
      }
    });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > 130) {
      setInputMessage(value.slice(0, 130));
      if (!errorDisplayed) {
        setErrorDisplayed(true);
        errorContext.setError("Message must be less than 130 chars");
      }
      return;
    }

    setInputMessage(value);
  };

  return (
    <>
      <Loading loading={loading} />
      <section className={styles.mainSection}>
        <Header title={data?.data.chat.name} />

        <section className={styles.messagesSection}>
          {messages &&
            messages.map((message) => {
              const received = message.sender !== userContext.username;

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
          <Button
            type="submit"
            padding="var(--padding-sm)  var(--padding-sm) var(--padding-sm) var(--padding-base)"
          >
            <IoSend size="1.3rem" />
          </Button>
        </form>
      </section>
    </>
  );
};

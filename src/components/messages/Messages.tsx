import { ReactNode, useEffect, useRef } from "react";
import styles from "./messages.module.css";
import { message } from "../../types";

interface Props {
  messages: message[];
  name?: string;
}
/** recieve the messages from database, add new messages and render them */
const Messages = ({ messages, name }: Props): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    container?.lastElementChild?.scrollIntoView({
      behavior: "auto",
      block: "end",
    });
  }, [messages.length]);

  return (
    <div ref={containerRef} className={styles.publicChatMessages}>
      {messages && messages.length > 0 &&
        messages.map((item: message): ReactNode => {
          const time = new Date(item.messageSendTime).toLocaleString();
          return (
            <div
              key={item.messageSendTime}
              className={styles.messageSend}
              id={item.userName === name ? styles.messageRecived : ""}
            >
              <span className={`${styles.message}`}>{item.message}</span>
              <div>
                <span className={styles.messageTime}>{time}</span>
                <span className={styles.userName}>
                  {item.userName === name ? "you" : item.userName}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Messages;

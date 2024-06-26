import styles from "./sendmessagesform.module.css";
import { useEffect, useRef } from "react";

type FormProps = {
  userName: string | undefined | null;
  handlerSendMessages: (text: string) => void;
};
const SendMessagesForm = ({ userName, handlerSendMessages }: FormProps) => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const btnSendRef = useRef<HTMLButtonElement>(null);

  /** avalibility of the send button */
  useEffect(() => {
    let availability = true;
    const input = messageRef.current;
    const btn = btnSendRef.current;
    if (btn && input) {
      if (userName?.trim()) availability = false;
      btn.disabled = availability;
      input.disabled = availability;
    }
  }, [userName]);

  const handlerMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageRef && messageRef.current) {
      const text = messageRef.current.value;
      if (!text || text.trim() === "") return;
      handlerSendMessages(text);
      (e.target as HTMLFormElement).reset();
    }
  };
  return (
    <div className={styles.publicChatFunctions}>
      <form onSubmit={handlerMessage}>
        <textarea ref={messageRef} placeholder="message" disabled />
        <button ref={btnSendRef} disabled>
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessagesForm;

import { ReactNode, useEffect, useRef } from 'react';
import styles from './messages.module.css';
import { message } from '../../types';

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
      behavior: 'auto',
      block: 'end',
    });
  }, [ messages.length ]);

  return (
    <div ref={containerRef} className={styles.publicChatMessages}>
      {messages &&
        messages.map((item: message): ReactNode => {
          const time = new Date(item.messageSendTime).toLocaleString();
          return (
            <div key={item.messageSendTime} className={styles.messageSend} id ={ item.userName === name ? styles.messageRecived : ''}>
              <span className={styles.userName}>{item.userName}</span>
              <div className={`${styles.message}`} >
                <span>{item.message}</span>
                <span className={styles.messageTime}>send on: {time}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Messages;

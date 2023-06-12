import Header from '../../components/header/Header';
import styles from './personalchat.module.css';

const PersonalChat = () => {
  return( 
    <div className={styles.containerPersonalChat}>
      <Header />
      <div className={styles.chatContainer}>
        
      </div>
    </div>
  );
};
export default PersonalChat;
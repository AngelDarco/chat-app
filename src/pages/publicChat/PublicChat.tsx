import { useEffect, useState } from 'react';
import Header, { headerUser } from '../../components/header/Header';
import styles from './publicChat.module.css';
import { v4 as uuidv4 } from 'uuid';
import Messages from '../../components/messages/Messages';
import useRealTimeDB from '../../hooks/useRealTimeDB';
import { intContext, intUpdateUserData, message } from '../../types';
import Loading from 'react-loading';
import LoginGuests from '../../components/loginguests/LoginGuests';
import userContexUpdate from '../../utils/useContextUpdate';
import SendMessagesForm from '../../components/sendMessagesForm/SendMessagesForm';

const PublicChat = (): JSX.Element => {
  // get firebase functions
  const { readUserData, updateUserData } = useRealTimeDB();

  // get the user context data
  const { userContextData } = userContexUpdate();

  //store and update user context data
  const [ userData, setUserData ] = useState<intContext>();
  const [ messages, setMessages ] = useState<message[]>();

  /* enable send messages options */
  useEffect(() => {
    // update the user context data
    userContextData()
      .then((res) => setUserData(res))
      .catch((err) => console.log(err));

    // get the public messages
    if (userData?.userName) getData();
  }, [ userData?.userName ]);

  const updateLocalUserData = (data: intContext): void => {
    setUserData(data);
  };

  /* get messages from firebase server */
  async function getData() {
    try {
      const userData = await readUserData<message[]>('/public/');
      setMessages(() => userData);
    } catch (error) {
      console.error(error);
    }
  }

  // write messages to the firebase server
  const handlerSendMessages = (text: string) => {
    const writeData: intUpdateUserData = {
      userDB: '/public/',
      messageId: uuidv4(),
      userName: userData?.userName || null,
      message: text,
      messageSendTime: new Date().getTime(),
    };
    updateUserData(writeData)
      .then(() => getData());    
  };

  return (
    <div className={styles.containerPublicChat}>
      <Header props={headerUser} />
      <div className={styles.publicChatContainer}>
        {
          !userData ? 
            <Loading type="cylon" color="green" className="loader" />
            : !userData?.userName ?
              <LoginGuests updateLocalUserData={updateLocalUserData} />
              : messages ? 
                <Messages messages={messages} name={userData.userName}/>
                :
                <Loading type="cylon" color="green" className="loader" />
        }
        <SendMessagesForm
          userName={userData?.userName}
          handlerSendMessages={handlerSendMessages}
        />
      </div>
    </div>
  );
};

export default PublicChat;

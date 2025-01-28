import { useContext, useEffect, useState } from "react";
import Header, { headerUser } from "../../components/header/Header";
import styles from "./publicChat.module.css";
import globalStyles from "../../css/global.module.css";
import { v4 as uuidv4 } from "uuid";
import Messages from "../../components/messages/Messages";
import useRealTimeDB from "../../hooks/useRealTimeDB";
import { intUpdateUserData, message } from "../../types";
import Loading from "react-loading";
import LoginGuests from "../../components/loginguests/LoginGuests";
import userContexUpdate from "../../utils/useContextUpdate";
import SendMessagesForm from "../../components/sendMessagesForm/SendMessagesForm";
import { Context } from "../../context/Context";

const PublicChat = (): JSX.Element => {
  // get firebase functions
  const { readUserData, updateUserData, } = useRealTimeDB();

  // get the user context data
  const { userContextData } = userContexUpdate();

  //store and update user context data
  const { login } = useContext(Context);
  const [messages, setMessages] = useState<message[]>();

  /* enable send messages options */
  useEffect(() => {
    // update the user context data
    userContextData()
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    // get the public messages
    if (login?.userName) getData();

  }, [login?.userName]);


  /* get messages from firebase server */
  async function getData() {
    await readUserData("/public/", setMessages, "array");
  }

  // write messages to the firebase server
  const handlerSendMessages = (text: string) => {
    const writeData: intUpdateUserData = {
      userDB: "/public/",
      messageId: uuidv4(),
      userName: login?.userName || null,
      message: text,
      messageSendTime: new Date().getTime(),
    };
    updateUserData(writeData).then(() => getData());
  };


  return (
    <div className={styles.containerPublicChat}>
      <Header props={headerUser} />
      <div className={styles.publicChatContainer}>
        {!login ? (
          <div className={globalStyles.loader}>
            <Loading type="cylon" color="green" />
          </div>
        ) : !login?.userName ? (
          <LoginGuests />
        ) : messages ? (
          <Messages messages={messages} name={login.userName} />
        ) : (
          <div className={globalStyles.loader}>
            <Loading type="cylon" color="green" />
          </div>
        )}
        <SendMessagesForm
          userUid={login?.userUid}
          userName={login?.userName}
          handlerSendMessages={handlerSendMessages}
        />
      </div>
    </div>
  );
};

export default PublicChat;

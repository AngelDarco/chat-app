import styles from "./personalchat.module.css";
import Header, { headerPersonalChats } from "../../components/header/Header";
import SendMessagesForm from "../../components/sendMessagesForm/SendMessagesForm";
import globalStyles from "../../css/global.module.css";
import { intAddFriend, intAddPersonalMessage, message } from "../../types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useRealTimeDB from "../../hooks/useRealTimeDB";
import { v4 as uuidv4 } from "uuid";
import Messages from "../../components/messages/Messages";
import Loading from "react-loading";

const PersonalChat = () => {
  const location = useLocation();
  const { ownerUid, ownerName, userUid, photo, userName } =
    location.state || {};

  const { readUserData, updateUserData } = useRealTimeDB();
  const [messages, setMessages] = useState<message[]>();

  useEffect(() => {
    getData();
  }, []);

  // get messages from firebase server
  async function getData() {
    try {
      await readUserData(
        `chats/${ownerUid}/${userUid}`,
        setMessages, "array"
      );

    } catch (error) {
      console.error(error);
    }
  }

  // write messages to the firebase server
  const writeChatMessages = async (
    uidFrom: string,
    uidTo: string,
    userName: string,
    message: string
  ) => {
    const writeData: intAddPersonalMessage = {
      userDB: "chats/",
      uidFrom,
      uidTo,
      messageId: uuidv4(),
      userName,
      message,
      messageSendTime: new Date().getTime(),
    };
    await updateUserData(writeData);
  };

  const writeFriends = async (userUid: string, friendUid: string) => {
    const writeData: intAddFriend = {
      userDB: "friends/",
      userUid,
      friendUid,
    };
    await updateUserData(writeData);
  };

  const handlerSendMessages = async (message: string) => {
    await writeChatMessages(ownerUid, userUid, ownerName, message);
    await writeChatMessages(userUid, ownerUid, ownerName, message);

    await writeFriends(ownerUid, userUid);
    await writeFriends(userUid, ownerUid);

    await getData();
  };

  return (
    <div className={styles.containerPersonalChat}>
      <Header props={headerPersonalChats} styles={{ ...style }} />
      <div className={styles.profileImg}>
        <img src={photo} alt={userName} />
        <label>{userName}</label>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.chat}>
          {!messages ? (
            <div className={globalStyles.loader}>
              <Loading type="cylon" color="green" />
            </div>
          ) : (
            <Messages messages={messages} name={ownerName} />
          )}
        </div>
        <SendMessagesForm
          userUid={userUid}
          userName={userName}
          handlerSendMessages={handlerSendMessages}
        />
      </div>
    </div>
  );
};
export default PersonalChat;

const style = {
  maxHeight: "fit-content",
  height: "4rem",
};

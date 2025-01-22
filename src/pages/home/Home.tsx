import Header from "../../components/header/Header";
import styles from "./home.module.css";
import globalStyles from "../../css/global.module.css";
import logo from "../../assets/profile.png";
import { headerUser } from "../../components/header/Header";
import { useContext, useEffect, useState } from "react";
import { database, intContext } from "../../types";
import userContexUpdate from "../../utils/useContextUpdate";
import Loading from "react-loading";
import MessageNoLogged from "../../components/messageNoLog/MessageNoLogged";
import useRealTimeDB from "../../hooks/useRealTimeDB";
import ProfileCard from "../../components/profileCard/ProfileCard";
import { debounce } from "../../utils/debounce";
import { Context } from "../../context/Context";

const User = (): JSX.Element => {
  const { userContextData } = userContexUpdate();
  // const [login, setUserData] = useState<intContext>();
  type contact = { arr: intContext[]; ownerUid: string; ownerName: string };
  const { login } = useContext(Context);

  const [contacts, setContacts] = useState<contact>();
  const [friends, setFriends] = useState<contact>();
  const [allUsers, setAllUsers] = useState<contact>();

  /** read and update userData */
  useEffect(() => {
    userContextData()
      .catch((err) => console.log(err));
  }, []);


  /** read all the users profiles */
  useEffect(() => {
    if (login?.userUid)
      readUsersData(`friends/${login?.userUid}`)
        .then((res) => {
          if (login?.userUid && login?.userName)
            setContacts({
              arr: res,
              ownerUid: login?.userUid,
              ownerName: login?.userName,
            });
        })
        .catch((err) => console.log(err));

    readUsersData("profiles/")
      .then((res) => {
        if (login?.userUid && login?.userName)
          setAllUsers({
            arr: res,
            ownerUid: login?.userUid,
            ownerName: login?.userName,
          });
      })
      .catch((err) => console.log(err));
  }, [login?.userUid]);

  useEffect(() => {
    interface arr {
      arr: { friendUid: string }[];
      ownerUid: string;
      ownerName: string;
    }

    const arr = [];
    if (allUsers && contacts) {
      const c = contacts as unknown as arr;
      for (let i = 0; i < allUsers.arr.length; i++) {
        for (let ii = 0; ii < contacts.arr.length; ii++) {
          if (allUsers.arr[i].userUid === c.arr[ii].friendUid) {
            arr.push(allUsers.arr[i]);
          }
        }
      }
    }
    if (login?.userUid && login?.userName)
      setFriends({
        arr,
        ownerUid: login?.userUid,
        ownerName: login?.userName,
      });
  }, [contacts, allUsers]);

  const readUsersData = async (path: database) => {
    const { readUserData } = useRealTimeDB();
    if (!login?.userUid) return [];
    const res = await readUserData(path, () => { });
    const arr: intContext[] = Object.values(res as intContext);
    return arr;
  };

  return (
    <div className={styles.containerUser}>
      <Header props={headerUser} />
      {!login ? (
        <div className={globalStyles.loader}>
          <Loading type="cylon" color="green" />
        </div>
      ) : !login.userUid ? (
        <MessageNoLogged />
      ) : (
        <div className={styles.userContent}>
          <div className={styles.header}>
            <img src={login?.photo || logo} alt="user-logo" />
            <h1>{login?.userName}</h1>
          </div>
          <h2>Last messages sended</h2>
          {
            // to show your last messages sender and receiver
            friends && (
              <ProfileCard
                contacts={friends}
                limit={3}
                section="lastMessages"
              />
            )
          }
          <h2>All users</h2>
          {
            // to show all users profiles
            allUsers && <ProfileCard contacts={allUsers} showState={true} />
          }
        </div>
      )}
    </div>
  );
};
export default User;

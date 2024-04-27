import Header from "../../components/header/Header";
import styles from "./home.module.css";
// import { FiSearch } from "react-icons/fi";
import logo from "../../assets/profile.png";
import { headerUser } from "../../components/header/Header";
import { useEffect, useState } from "react";
import { database, intContext } from "../../types";
import userContexUpdate from "../../utils/useContextUpdate";
import Loading from "react-loading";
import MessageNoLogged from "../../components/messageNoLog/MessageNoLogged";
import useRealTimeDB from "../../hooks/useRealTimeDB";
import ProfileCard from "../../components/profileCard/ProfileCard";

const User = (): JSX.Element => {
  const { userContextData } = userContexUpdate();
  const [userData, setUserData] = useState<intContext>();
  type contact = { arr: intContext[]; ownerUid: string; ownerName: string };
  const [contacts, setContacts] = useState<contact>();
  const [friends, setFriends] = useState<contact>();
  const [allUsers, setAllUsers] = useState<contact>();

  /** read and update userdata */
  useEffect(() => {
    userContextData()
      .then((res) => setUserData(res))
      .catch((err) => console.log(err));
  }, [userData?.userUid]);

  /** read all the users profiles */
  useEffect(() => {
    if (userData?.userUid)
      readUsersData(`friends/${userData?.userUid}`)
        .then((res) => {
          if (userData?.userUid && userData?.userName)
            setContacts({
              arr: res,
              ownerUid: userData?.userUid,
              ownerName: userData?.userName,
            });
        })
        .catch((err) => console.log(err));

    readUsersData("profiles/")
      .then((res) => {
        if (userData?.userUid && userData?.userName)
          setAllUsers({
            arr: res,
            ownerUid: userData?.userUid,
            ownerName: userData?.userName,
          });
      })
      .catch((err) => console.log(err));
  }, [userData?.userUid]);

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
    if (userData?.userUid && userData?.userName)
      setFriends({
        arr,
        ownerUid: userData?.userUid,
        ownerName: userData?.userName,
      });
  }, [contacts, allUsers]);

  const readUsersData = async (path: database) => {
    const { readUserData } = useRealTimeDB();
    const res = await readUserData(path);
    const arr: intContext[] = Object.values(res as intContext);
    return arr;
  };

  return (
    <div className={styles.containerUser}>
      <Header props={headerUser} />
      {!userData ? (
        <Loading type="cylon" color="green" className={"loader"} />
      ) : !userData.userUid ? (
        <MessageNoLogged />
      ) : (
        <div className={styles.userContent}>
          <div className={styles.header}>
            <img src={userData?.photo || logo} alt="user-logo" />
            <h1>{userData?.userName}</h1>
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

import Header from "../../components/header/Header";
import styles from "./profile.module.css";
import { FaUserFriends } from "react-icons/fa";
import { headerUser } from "../../components/header/Header";
import { useEffect, useState } from "react";
import MessageNoLogged from "../../components/messageNoLog/MessageNoLogged";
import { Link, useNavigate } from "react-router-dom";
import { intContext } from "../../types";
import Loading from "react-loading";
import userContexUpdate from "../../utils/useContextUpdate";
import useRealTimeDB from "../../hooks/useRealTimeDB";

const Profile = (): JSX.Element => {
  const { userContextData } = userContexUpdate();
  const [userData, setUserData] = useState<intContext>();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState<intContext[]>();
  /** read all the users profiles */
  useEffect(() => {
    const { readUserData } = useRealTimeDB();
    (async () => {
      const res = await readUserData("profiles/");
      const arr: intContext[] = Object.values(res as intContext);
      setContacts(arr);
    })();
  }, [userData?.userUid]);

  /* get user info */
  useEffect(() => {
    userContextData().then((res) => res && setUserData(res));
  }, [userData?.userUid]);

  const handlerClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    userUid: string | null
  ) => {
    const li = e.currentTarget;
    const Data = {
      ownerName: userData?.userName,
      ownerUid: userData?.userUid,
      userUid,
      photo: li.querySelector("img")?.src,
      userName: li.querySelector("span")?.textContent,
    };
    navigate("/chat", { state: Data });
  };

  return (
    <div className={styles.containerHome}>
      <Header props={headerUser} />
      {!userData ? (
        <Loading type="cylon" color="green" className="loader" />
      ) : !userData?.userUid ? (
        <MessageNoLogged />
      ) : (
        <div className={styles.homeSection}>
          <Link to={"/profileconfig"}>edit</Link>
          <div className={styles.picture}>
            <img
              className={styles.mainImg}
              src={userData?.photo}
              alt="user-logo"
            />
            <p>{`${userData?.userName} ${userData?.lastName}`}</p>
            <span>{userData?.state}</span>
          </div>
          <div className={styles.about}>
            {userData.about && <span>About me:</span>}
            <p>{userData?.about}</p>
          </div>
          <div className={styles.title}>
            <FaUserFriends />
            <span>Make some Friends</span>
          </div>
          <div className={styles.friends}>
            <ul>
              {contacts &&
                contacts.map((item, i) => {
                  return (
                    <li key={i} onClick={(e) => handlerClick(e, item.userUid)}>
                      <img src={item.photo} />
                      <div>
                        <span>{item.userName}</span>
                        <p>{item.state}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;

import Header from "../../components/header/Header";
import styles from "./profile.module.css";
import globalStyles from "../../css/global.module.css";
import { FaUserFriends } from "react-icons/fa";
import { headerUser } from "../../components/header/Header";
import { useContext, useEffect, useState } from "react";
import MessageNoLogged from "../../components/messageNoLog/MessageNoLogged";
import { Link, useNavigate } from "react-router-dom";
import { intContext } from "../../types";
import Loading from "react-loading";
import userContexUpdate from "../../utils/useContextUpdate";
import useRealTimeDB from "../../hooks/useRealTimeDB";
import { Context } from "../../context/Context";

const Profile = (): JSX.Element => {
  const { userContextData } = userContexUpdate();
  const { login } = useContext(Context);

  const navigate = useNavigate();

  const [contacts, setContacts] = useState<intContext[]>();
  /** read all the users profiles */
  useEffect(() => {
    const { readUserData } = useRealTimeDB();
    (async () => {
      if (login?.userUid)
        await readUserData("profiles/", setContacts, "array");
    })();
  }, [login?.userUid]);

  /* get user info */
  useEffect(() => {
    userContextData()
  }, []);

  const handlerClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    userUid: string | null
  ) => {
    const li = e.currentTarget;
    const Data = {
      ownerName: login?.userName,
      ownerUid: login?.userUid,
      userUid,
      photo: li.querySelector("img")?.src,
      userName: li.querySelector("span")?.textContent,
    };
    navigate("/chat", { state: Data });
  };

  return (
    <div className={styles.containerHome}>
      <Header props={headerUser} />
      {!login ? (
        <div className={globalStyles.loader}>
          <Loading type="cylon" color="green" />
        </div>
      ) : !login?.userUid ? (
        <MessageNoLogged />
      ) : (
        <div className={styles.homeSection}>
          <Link to={"/profileconfig"}>config</Link>
          <div className={styles.picture}>
            <img
              className={styles.mainImg}
              src={login?.photo}
              alt="user-logo"
            />
            <div>
              <p>{`${login?.userName} ${login?.lastName}`}</p>
              <span>{login?.state}</span>
            </div>
          </div>
          <div className={styles.about}>
            {login.about && <span>About me:</span>}
            <p>{login?.about}</p>
          </div>
          <div className={styles.title}>
            <FaUserFriends />
            <span>Make some Friends</span>
          </div>
          <div className={styles.friends}>
            <ul>
              {contacts && contacts.length > 0 &&
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

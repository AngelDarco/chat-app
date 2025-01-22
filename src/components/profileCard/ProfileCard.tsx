import styles from "./ProfileCard.module.css";
import globalStyles from "../../css/global.module.css";
import Loading from "react-loading";
import { intContext } from "../../types";
import { useNavigate } from "react-router";
type contacts = { arr: intContext[]; ownerUid: string; ownerName: string };
interface profilesCard {
  contacts: contacts;
  showAbout?: boolean;
  showState?: boolean;
  limit?: number;
  section?: string;
}
const ProfileCard = (props: profilesCard) => {
  const {
    contacts,
    showAbout = false,
    showState = false,
    limit,
    section,
  } = props;

  // send user to chat data
  const navigate = useNavigate();
  const handlerClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    userUid: string | null
  ) => {
    const li = e.currentTarget;
    const userData = {
      ownerName: contacts.ownerName,
      ownerUid: contacts.ownerUid,
      userUid,
      photo: li.querySelector("img")?.src,
      userName: li.querySelector("span")?.textContent,
    };
    navigate("/chat", { state: userData });
  };

  return (
    <div
      className={`${styles.profileCardContainer} ${section ? styles.rowContainer : ""}`}
    >
      <ul className={`${section ? styles.ulRow : ""}`}>
        {!contacts ? (
          <div className={globalStyles.loader}>
            <Loading type="cylon" color="green" />
          </div>
        ) : (
          contacts.arr?.map((item, i) => {
            if (limit && i > limit) return;
            return (
              <li
                key={i}
                onClick={(e) => handlerClick(e, item.userUid)}
                className={`${!section ? globalStyles.glass : ""} ${section ? styles.liRow : ""}`}
              >
                <img src={item.photo} />
                <div>
                  <span>{item.userName}</span>
                  {showState && <p>{item.state}</p>}
                  {showAbout && <p>{item.about}</p>}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
export default ProfileCard;

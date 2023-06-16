import styles from './ProfileCard.module.css';
import Loading from 'react-loading';
import { intContext } from '../../types';
import { useNavigate } from 'react-router';
type contacts = { arr :intContext[], ownerUid: string, ownerName: string };
interface profilesCard {
    style:CSSModuleClasses[string];
    contacts: contacts;
    showAbout?: boolean;
    showState?: boolean;
  limit?: number;}
const ProfileCard = (props:profilesCard) => {
  const { 
    style,
    contacts,
    showAbout = false,
    showState = false,
    limit } = props;    
    
  // send user to chat data
  const navigate = useNavigate();
  const handlerClick = (e:React.MouseEvent<HTMLLIElement, MouseEvent>, userUid:string | null)=>{    
    const li = e.currentTarget;
    const userData = {
      ownerName: contacts.ownerName,
      ownerUid: contacts.ownerUid,
      userUid,
      photo: li.querySelector('img')?.src,
      userName: li.querySelector('span')?.textContent,
    };
    navigate('/chat',{ state: userData });
  };

  return (
    <div className={styles.containerProfileCard}>
      <ul className={ style ? style : styles.list}>
        {!contacts ? (
          <Loading type="cylon" color="green" className={'loader'} />
        ) : (
          contacts.arr?.map((item, i) => {
            if (limit &&i > limit) return;
            return (
              <li key={i} onClick={(e)=>handlerClick(e,item.userUid)}>
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
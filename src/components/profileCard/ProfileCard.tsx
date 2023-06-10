import styles from './ProfileCard.module.css';
import Loading from 'react-loading';
import { intContext } from '../../types';

interface profilesCard {
    style:CSSModuleClasses[string];
    contacts: intContext[];
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
    
  return (
    <div className={styles.containerProfileCard}>
      <ul className={ style ? style : styles.list}>
        {!contacts ? (
          <Loading type="cylon" color="green" className={'loader'} />
        ) : (
          contacts?.map((item, i) => {
            if (limit &&i > limit) return;
            return (
              <li key={i}>
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
/* eslint-disable indent */
import Header from '../../components/header/Header';
import styles from './home.module.css';
import { FiSearch } from 'react-icons/fi';
import logo from '../../assets/img/ico.png';
import { headerUser } from '../../components/header/Header';
import { useEffect, useState } from 'react';
import { intContext } from '../../types';
import userContexUpdate from '../../utils/useContextUpdate';
import Loading from 'react-loading';
import MessageNoLogged from '../../components/messageNoLog/MessageNoLogged';
import useRealTimeDB from '../../hooks/useRealTimeDB';
import ProfileCard from '../../components/profileCard/ProfileCard';

const User = (): JSX.Element => {
  const { userContextData } = userContexUpdate();
  const [ userData, setUserData ] = useState<intContext>();
  const [ contacts, setContacts ] = useState<intContext[]>();

  /** read and update userdata */
  useEffect(() => {
    userContextData()
      .then((res) => setUserData(res))
      .catch((err) => console.log(err));
  }, [ userData?.userUid ]);

  /** read all the users profiles */
  useEffect(() => {
    const { readUserData } = useRealTimeDB();
    (async () => {
      const res = await readUserData('/profiles/');
      const arr: intContext[] = Object.values(res as intContext);
      setContacts(arr);
    })();
  }, []);

  return (
    <div className={styles.containerUser}>
      <Header props={headerUser} />
      {!userData ? (
        <Loading type="cylon" color="green" className={'loader'} />
      ) : !userData.userUid ? (
        <MessageNoLogged />
      ) : (
        <div className={styles.userContent}>
          {/* <div style={style}>Sorry, this function is not available yet, but we are working on it!</div> */}
          <div className={styles.header}>
            <div>
              <img src={logo} alt="user-logo" />
              <FiSearch />
            </div>
            <p>Messages</p>
          </div>
          {
			contacts &&
			<ProfileCard
				style={styles.contacts}
				contacts={contacts}
				limit={3}
			/>
		}
         {
		contacts &&
		<ProfileCard 
			style={styles.chats} 
			contacts={contacts} 
			showState={true} />
			}
		
        </div>
      )}
    </div>
  );
};
export default User;
const style: React.CSSProperties = {
  width: '100%',
  height: '100%',
  top: '0',
  position: 'absolute',
  backgroundColor: '#000000D0',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  padding: '15px',
};

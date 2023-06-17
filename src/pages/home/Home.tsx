import Header from '../../components/header/Header';
import styles from './home.module.css';
import { FiSearch } from 'react-icons/fi';
import logo from '../../assets/img/ico.png';
import { headerUser } from '../../components/header/Header';
import { useEffect, useState } from 'react';
import { database, intContext } from '../../types';
import userContexUpdate from '../../utils/useContextUpdate';
import Loading from 'react-loading';
import MessageNoLogged from '../../components/messageNoLog/MessageNoLogged';
import useRealTimeDB from '../../hooks/useRealTimeDB';
import ProfileCard from '../../components/profileCard/ProfileCard';

const User = (): JSX.Element => {
  const { userContextData } = userContexUpdate();
  const [ userData, setUserData ] = useState<intContext>();
  type contact = { arr :intContext[], ownerUid: string, ownerName: string };
  const [ contacts, setContacts ] = useState<contact>();
  const [ friends, setFriends ] = useState<contact>();
  const [ allUsers, setAllUsers ] = useState<contact>();

  /** read and update userdata */
  useEffect(() => {
    userContextData()
      .then((res) => setUserData(res))
      .catch((err) => console.log(err));
  }, [ userData?.userUid ]);

  /** read all the users profiles */
  useEffect(() => {
    if(userData?.userUid)
      readUsersData(`friends/${userData?.userUid}`)
        .then((res) => {
          if(userData?.userUid && userData?.userName)
            setContacts({ arr: res, ownerUid: userData?.userUid, ownerName: userData?.userName });
        })
        .catch((err) => console.log(err));

    readUsersData('profiles/')
      .then(res => {
        if(userData?.userUid && userData?.userName)
          setAllUsers({ arr: res, ownerUid: userData?.userUid, ownerName: userData?.userName });
      })
      .catch((err) => console.log(err));

  }, [ userData?.userUid ]);


  useEffect(() => {
  interface arr { arr: {friendUid: string}[]; ownerUid: string; ownerName: string }

  const arr = [];
  if(allUsers && contacts){
    const c = contacts as unknown as arr; 
    for(let i = 0; i < allUsers.arr.length; i++){
      for(let ii = 0; ii < contacts.arr.length; ii++){
        if(allUsers.arr[i].userUid === c.arr[ii].friendUid){
          arr.push(allUsers.arr[i]);
        }
      }
    }
  }
  if(userData?.userUid && userData?.userName)
    setFriends({ arr, ownerUid: userData?.userUid, ownerName: userData?.userName });

  },[ contacts, allUsers ]);

  const readUsersData = async (path:database) => {
    const { readUserData } = useRealTimeDB();
    const res = await readUserData(path);
    const arr: intContext[] = Object.values(res as intContext);      
    return arr;
  };

  return (
    <div className={styles.containerUser}>
      <Header props={headerUser} />
      {!userData ? (
        <Loading type="cylon" color="green" className={'loader'} />
      ) : !userData.userUid ? (
        <MessageNoLogged />
      ) : (
        <div className={styles.userContent}>
          <div className={styles.header}>
            <div>
              <img src={logo} alt="user-logo" />
              <FiSearch />
            </div>
            <p>Messages</p>
          </div>
          {
            // to show your last messages sender and receiver
            friends && (
              <ProfileCard
                style={styles.contacts}
                contacts={friends}
                limit={3}
              />
            )}
          {
          // to show all users profiles
            allUsers && (
              <ProfileCard
                style={styles.chats}
                contacts={allUsers}
                showState={true}
              />
            )}
        </div>
      )}
    </div>
  );
};
export default User;
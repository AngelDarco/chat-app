import Header from '../../components/header/Header';
import styles from './profile.module.css';
import logo from '../../assets/img/ico.png';
import { FaUserFriends } from 'react-icons/fa';
import { headerUser } from '../../components/header/Header';
import { useEffect, useState } from 'react';
import MessageNoLogged from '../../components/messageNoLog/MessageNoLogged';
import { Link } from 'react-router-dom';
import useRealTimeDB from '../../hooks/useRealTimeDB';
import { intContext } from '../../types';
import Loading from 'react-loading';
import userContexUpdate from '../../utils/useContextUpdate';

const Profile = (): JSX.Element => {
	const { userContextData, initialState } = userContexUpdate();
	const { userUid } = userContextData();
	
	const { readUserData } = useRealTimeDB();
	
	const [userData, setUserData] = useState<intContext>(initialState);

	const contacts = [
		{
			img: logo,
			name: 'Angel',
			state: 'Siempre con la mentalidad de que soy el mejor'
		},
		{
			img: logo,
			name: 'Marco',
			state: 'Siempre con la mentalidad de que soy el mejor'
		},
		{
			img: logo,
			name: 'Darco',
			state: 'Siempre con la mentalidad de que soy el mejor'
		}
	];

	/* get user info */
	useEffect(() => {
		if(userUid)
			readUserData('profiles/' + userUid)
				.then((res) => {
					if(Object.values(res as object).length === 0) return;
					setUserData({
						...userData,
						...res as intContext});
				})
				.catch(err => console.log(err));
	}, [userUid]);
			

	return (
		<div className={styles.containerHome}>
			<Header props={headerUser} />
			{ !userUid ? <MessageNoLogged /> :
				!userData ?
					<Loading 
						type='cylon'
						color='green'
						className='loader'
					/>
					:
					<div className={styles.homeSection}>
						<Link to={'/profileconfig'}>edit</Link>
						<div className={styles.picture}>
							<img src={userData?.photo} alt="user-logo" />
							<p>{`${userData?.userName} ${userData?.lastName}`}</p>
							<span>{userData?.state}</span>
						</div>
						<div className={styles.about}>
							<span>About me:</span>
							<p>{userData?.about}</p>
						</div>
						<div className={styles.addFriends}>
							<FaUserFriends />
							<p>Add Friends</p>
						</div>
						<div className={styles.friends}>
							<span className={styles.title}>Your Friends</span>
							<ul>
								{
									contacts.map((item, i) => {
										return (
											<li key={i}>
												<img src={item.img} />
												<div>
													<span>{item.name}</span>
													<p>{item.state}</p>
												</div>
											</li>
										);
									})
								}
							</ul>
						</div>
					</div>
			}
		</div>
	);
};
export default Profile;
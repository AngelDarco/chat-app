import Header from '../../components/header/Header';
import styles from './profile.module.css';
import logo from '../../assets/img/ico.png';
import { FaUserFriends } from 'react-icons/fa';
import { headerUser } from '../../components/header/Header';
import { useEffect, useState } from 'react';
import MessageNoLogged from '../../components/messageNoLog/MessageNoLogged';
import { Link } from 'react-router-dom';
import { intContext } from '../../types';
import Loading from 'react-loading';
import userContexUpdate from '../../utils/useContextUpdate';

const Profile = (): JSX.Element => {
	const { userContextData } = userContexUpdate();
	const [userData, setUserData] = useState<intContext>();

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
		userContextData()
			.then(res =>
				res && setUserData(res));
	}, [userData?.userUid]);	

	return (
		<div className={styles.containerHome}>
			<Header props={headerUser} />
			{!userData ? <Loading
				type='cylon'
				color='green'
				className='loader'
			/> :
				!userData?.userUid ?
					<MessageNoLogged />
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
								<div style={style}>Sorry, this function is not available yet, but we are working on it!</div>
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

const style: React.CSSProperties = {
	width: '100%',
	height: '100%',
	position: 'absolute',
	top: '0',
	left: '0',
	backgroundColor: '#000000D0',
	color : 'white',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '28px',
	padding: '15px',
};
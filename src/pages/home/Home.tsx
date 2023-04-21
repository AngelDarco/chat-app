import Header from '../../components/header/Header';
import styles from './home.module.css';
import logo from '../../assets/img/ico.png';
import { FaUserFriends } from 'react-icons/fa';
import { headerUser } from '../../components/header/Header';
import { Context } from '../../context/Context';
import { useContext, useEffect, useState } from 'react';
import MessageNoLogged from '../../components/messageNoLog/MessageNoLogged';
import { Link } from 'react-router-dom';
import useRealTimeDB from '../../hooks/useRealTimeDB';
import { intWriteProfiles } from '../../types';

const Home = (): JSX.Element => {
	const { userUid } = useContext(Context);
	const { readUserData } = useRealTimeDB();
	const [userData, setUserData] = useState<intWriteProfiles>();

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
		readUserData('profiles/' + userUid)
			.then((res) => {
				setUserData(res as intWriteProfiles);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<div className={styles.containerHome}>
			<Header props={headerUser} />
			{!userUid ? <MessageNoLogged />
				: <div className={styles.homeSection}>
					<Link to={'/perfilconfig'}>edit</Link>
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
export default Home;
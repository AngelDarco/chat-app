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

const User = (): JSX.Element => {
	const { userContextData } = userContexUpdate(); 
	const [ userData, setUserData ] = useState<intContext>();
	useEffect(()=>{
		userContextData()
			.then(res => setUserData(res))
			.catch(err => console.log(err));
	},[userData?.userUid]);

	const contacts = [
		{
			img: logo,
			name: 'Angel'
		},
		{
			img: logo,
			name: 'Marco'
		},
		{
			img: logo,
			name: 'Darco'
		}
	];
	return (
		<div className={styles.containerUser}>
			<Header props={headerUser} />
			{!userData ? 
				<Loading
					type='cylon'
					color= 'green'
					className={'loader'}
				/>
				: !userData.userUid ?
					<MessageNoLogged/>
					:
					<div className={styles.userContent}>
						<div className={styles.header}>
							<div>
								<img src={logo} alt="user-logo" />
								<FiSearch />
							</div>
							<p>Messages</p>
						</div>
						<div className={styles.contacts}>
							<ul>
								{
									contacts.map((item, i) => {
										return (
											<li key={i}>
												<img src={item.img} />
												<span>{item.name}</span>
											</li>
										);
									})
								}
							</ul>
						</div>
						<div className={styles.chats}>
							<ul>
								{
									contacts.map((item, i) => {
										return (
											<li key={i}>
												<img src={item.img} />
												<div className={styles.context}>
													<span>{item.name}</span>
													<p>text of last message</p>
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
export default User;
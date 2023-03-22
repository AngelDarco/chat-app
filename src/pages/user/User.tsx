import React from 'react';
import Header from '../../components/header/Header';
import styles from './user.module.css';
import { FiSearch } from 'react-icons/fi';
import logo from '../../assets/img/ico.png';
import { headerUser } from '../../components/header/Header';

const User = (): JSX.Element => {
	const user: string | boolean = 'false';
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
			{!user ? <h5> you must be loged to see this section </h5> :
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
import React from 'react';
import Header from '../../components/header/Header';
import styles from './home.module.css';
import logo from '../../assets/img/ico.png';
import { FaUserFriends } from 'react-icons/fa';
import { headerUser } from '../../components/header/Header';

const Home = () : JSX.Element =>{
	const contacts = [
		{
			img: logo,
			name: 'Angel',
			state: 'Siempre con la mentalidad de que soy el mejor'
		},
		{
			img: logo ,
			name: 'Marco',
			state: 'Siempre con la mentalidad de que soy el mejor'
		},
		{
			img: logo ,
			name: 'Darco',
			state: 'Siempre con la mentalidad de que soy el mejor'
		}
	];
	return(
		<div className={styles.containerHome}>
			<Header props={headerUser} />
			<div className={styles.homeSection}>
				<div className={styles.picture}>
					<img src={logo} alt="user-logo" />
					<p>Angel Darco</p>
					<span>Siempre con la mentalidad de que soy el mejor</span>
				</div>
				<div className={styles.addFriends}>
					<FaUserFriends/>
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
		</div>
	);
};
export default Home;
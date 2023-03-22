import React from 'react';
import styles from './welcome.module.css';
import ico from '../../assets/img/ico.png';
import { Link } from 'react-router-dom';
import { VscSignIn } from 'react-icons/vsc';
import { BsGoogle } from 'react-icons/bs';
import { FaUserPlus } from 'react-icons/fa';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';

const Welcome = ():JSX.Element =>{
	return(
		<div className={styles.containerMain}>
			<div className={styles.mainLogo}>
				<img src={ico} alt="main-logo" />
			</div>
			<div className={styles.mainWelcomeText}>
				<h1>The Best online chat that you could find today</h1>
				<span> You can choice login if you already have an account, register and create and account or just try the chat with the opcion: <p> <Link to={'public'}><HiChatBubbleLeftRight />Just check it out</Link></p> </span>
			</div>
			<div className={styles.mainLoginOptions}>
				<Link to={'/'} ></Link>
				<Link to={'/login'} > <VscSignIn/> Login</Link>
				<Link to={'/gmail'} > <BsGoogle/> Login with Gmail</Link>
				<Link to={'/register'} > <FaUserPlus />New User? Sign Up</Link>
				<Link to={'/public'} > <HiChatBubbleLeftRight />Just check it out</Link>
			</div>
		</div>
	);
};

export default Welcome;
import React from 'react';
import styles from './login.module.css';
import ico from '../../assets/img/ico.png';
import Header, { headerPublic } from '../../components/header/Header';

const Login = (): JSX.Element =>{
	return(
		<div className={styles.containerLogin}>
			<Header props={headerPublic}/>
			<div className={styles.logo}>
				<img src={ico} alt="main-logo" />
			</div>
			<form>
				<label htmlFor="email">Email</label>
				<input type="text" name='email' />
				<label htmlFor="password">Password</label>
				<input type="password"/>
				<button type="submit">Log in</button>
			</form>
		</div>
	);
};
export default Login;
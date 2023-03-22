import React from 'react';
import Header, { headerPublic } from '../../components/header/Header';
import styles from './register.module.css';
import logo from '../../assets/img/ico.png';

const Register = (): JSX.Element =>{
	return(
		<div className={styles.containerRegister}>
			<Header props={headerPublic} />
			<div className={styles.logoRegister}>
				<img src={logo} alt="main-logo" />
			</div>
			<form>
				<label htmlFor="name">Name</label>
				<input type="text" />
				<label htmlFor="email">Email</label>
				<input type="email" name="email"/>
				<label htmlFor="password">Password</label>
				<input type="password" name="password"/>
				<label htmlFor="password2">Repet password</label>
				<input type="password" name="password2"/>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
import React from 'react';
import Header, { headerPublic } from '../../components/header/Header';
import styles from './gmail.module.css';

const Gmail = () : JSX.Element =>{
	return(
		<div className={styles.containerGmail}>
			<Header props={headerPublic} />
			<form>
				<button>Log Up</button>
				<button>Log In</button>
			</form>
		</div>
	);
};
export default Gmail;
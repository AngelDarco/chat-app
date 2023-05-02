import styles from './logingmail.module.css';
import Header, { headerLogin } from '../../../components/header/Header';

const LoginGmail = ()=>{
	return (
		<>
			{
				// !login?.userUid &&
				<div className={styles.containerLoginGmail}>
					<Header props={headerLogin} />
					{/* <div className={styles.logo}>
					<img src={ico} alt="main-logo" />
				</div> */}
				
				</div>	
			}
		</>
	);
};
export default LoginGmail;
import styles from './loginphone.module.css';
import Header, { headerLogin } from '../../../components/header/Header';

const LoginPhone = ()=>{

	return (
		<>
			{
				// !login?.userUid &&
				<div className={styles.containerLoginPhone}>
					<Header props={headerLogin} />
					<div className={styles.form_phone}>
					</div>
				</div>	
			}
		</>
	);
};
export default LoginPhone;
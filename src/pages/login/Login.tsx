import styles from './login.module.css';
import { Link } from 'react-router-dom';
import Header, { headerLogin } from '../../components/header/Header';
import { RiPhoneFill } from 'react-icons/ri';
import { AiOutlineGoogle } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';

const Login = ()=>{
	return(
		<div className={styles.containerLogin}>
			<Header props={ headerLogin } />
			<div className={styles.logo}>
				{/* <img src={ico} alt="main-logo" /> */}
			</div>
			<div className={styles.links}>
				<div><Link to={'/email'}><MdOutlineAlternateEmail/> Login with Email</Link></div>
				<div><Link to={'/gmail'}><AiOutlineGoogle/> Login with Gmail</Link></div>
				<div><Link to={'/phone'}><RiPhoneFill/>Login with Phone</Link></div>
			</div>
		</div>
	);
};
export default Login;
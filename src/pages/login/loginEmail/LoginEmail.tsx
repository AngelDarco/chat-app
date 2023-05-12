import styles from './loginemail.module.css';
import ico from '../../../assets/img/ico.png';
import Header, { headerLogin } from '../../../components/header/Header';
import { FormEvent, useContext, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';
import { intLoginUserData } from '../../../types';
import useLoginUsers from '../../../hooks/useLoginUsers';
import { Context } from '../../../context/Context';
import { useNavigate } from 'react-router';


const Login = (): JSX.Element => {
	const { loginWithEmail } = useLoginUsers();
	const { login, setLogin } = useContext(Context);
	const navigate = useNavigate();
	const initUserData: intLoginUserData = { email: '', password: '' };
	const userDataRef = useRef<intLoginUserData>(initUserData);

	// useEffect(()=>{
	// 	if(login?.userUid) navigate('/profile');
	// },[login?.userUid]);

	const handlerLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email, password } = userDataRef.current;
		if (email.trim() === '' || password.trim() === '') {
			toast('Fields empty',{
				position: 'bottom-right',
				autoClose: 2000,
				type: 'error'
			});
		}else{
			loginWithEmail({email,password})
				.then((res) =>{
					if(res?.uid){
						toast('Access granted',{
							delay: 1000,
							position: 'bottom-center',
							type: 'success'
						});
						const data ={ ...login,	userUid: res?.uid };
						window.localStorage.setItem('chatDarcoUserUid', res?.uid);

						setLogin &&	setLogin(data);
						
					}else
						toast(res?.message,{
							delay: 1000,
							position: 'bottom-center',
							type: 'error'
						}); 
				})
				.catch(err=>{
					toast(err,{
						delay: 2000,
						position: 'bottom-center',
						type: 'error'
					});
					console.log(err);
				});
		}
	};	

	const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		name === 'email' && (userDataRef.current.email = value) ||
			name === 'password' && (userDataRef.current.password = value);
	};

	return (
		<>
			{
				// !login?.userUid &&
				<div className={styles.containerLoginEmail}>
					<Header props={headerLogin} />
					<div className={styles.logo}>
						<img src={ico} alt="main-logo" />
					</div>
					<form onSubmit={handlerLogin}>
						<label htmlFor="email">Email</label>
						<input onChange={handlerChange} type="text" name='email' />
						<label htmlFor="password">Password</label>
						<input onChange={handlerChange} type="password" name='password' />
						<button type="submit">Log in</button>
					</form>
				</div>	
			}
		</>
	);
};
export default Login;
import { FormEvent, useEffect, useRef, useState } from 'react';
import Header, { headerRegister} from '../../components/header/Header';
import styles from './register.module.css';
import useRegisterUsers from '../../hooks/useRegisterUsers';
import { intContext } from '../../types';
import { User } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import userContexUpdate from '../../utils/useContextUpdate';
import { useNavigate } from 'react-router';

const Register = () => {
	const { createAcountWithEmail } = useRegisterUsers();
	const { updateUserContext, initialState } = userContexUpdate();
	const formRef = useRef(null);
	const errorMessageRef = useRef<HTMLSpanElement>(null);
	const [ userData, setUserData ] = useState<intContext>();
	const navigate = useNavigate();

	useEffect(() => {
		if(userData?.userUid)
			updateUserContext({...initialState, ...userData})
				.then(res =>					
					res==='data writed' &&
					toast.onChange(resp=>{
						if(resp.status === 'removed')
							navigate('/profile');
					}))
				.catch(err => console.log(err));

	},[userData?.userUid]);
		

	/** @description return false if the form is valid, true otherwise */ 
	/** verify the email and password inputs are valid */
	let res = false;
	let id: NodeJS.Timeout;
	const formValidation = (form: [string, FormDataEntryValue][]) => {
		for(let i = 0; i < form.length; i++) if(!form[i][1]) res = true;
		
		if(form[1][1] !== form[2][1]) res = true;	

		if(errorMessageRef && errorMessageRef.current && res)
			errorMessageRef.current.innerHTML = 'Please check your info and try again';
		

		clearInterval(id);
		id = setTimeout(() => {
			res = false;
			if(errorMessageRef && errorMessageRef.current)
				errorMessageRef.current.innerHTML = '';
		}, 2000);
		return res;
	};

	/** submit form and register the user */
	interface resUserLog extends User {	message:string }
	const handlerRegister = (e:FormEvent<HTMLFormElement>)=> {
		e.preventDefault();
		if(formRef.current){
			const formData = new FormData(formRef?.current);
			const data = [...formData.entries()];
			const validation = formValidation(data);

			const userDataLog = {
				'email': data[0][1] as string,
				'password':  data[1][1] as string
			};
			
			if(!validation) 
				toast.promise(
					createAcountWithEmail(userDataLog)
						.then(res  => {
							if (res){
								const { uid, email, message } = res as resUserLog;
								if(message) {
									toast.error(message);
									return new Error(message);
								}else if(uid && email) {
									toast.success('Account created successfully');
									const data = {userUid: uid, userName: email?.split('@')[0] || ''};
									setUserData(data);
								}
							}
						})
						.catch(err => {
							toast.error(err);
							console.log(err);
						}),{
						pending: 'Creating account...',
						error: 'We sorry, Something went wrong'
					}
				);
		}
	};
	return(
		<div className={styles.registerContainer}>
			<Header props={headerRegister}/>
			<ToastContainer
				position="bottom-center"
				autoClose={2000}
			/>
			<div className={styles.registerForm}>
				<h1>Log up ...</h1>
				<form onSubmit={handlerRegister} ref={formRef}>
					<label htmlFor="email">Email</label>
					<input type="email" placeholder="Email" name='email'/>
					<label htmlFor="password">Password</label>
					<input type="password" placeholder="Password" name="password" />
					<label htmlFor="password2"> Confirm Password</label>
					<input type="password" placeholder="Password" name="password2" />
					<span className={styles.error} ref={errorMessageRef}></span>
					<button>Register</button>
				</form>
			</div>
		</div>
	);
};
export default Register;
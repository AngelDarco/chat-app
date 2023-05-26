import styles from './loginemail.module.css';
import ico from '../../../assets/img/ico.png';
import Header, { headerLogin } from '../../../components/header/Header';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { intContext, intLoginUserData } from '../../../types';
import useLoginUsers from '../../../hooks/useLoginUsers';
import { useNavigate } from 'react-router';
import userContexUpdate from '../../../utils/useContextUpdate';
import ProtectedRoutes from '../../../routes/ProtectedRoutes';

const LoginEmail = (): JSX.Element => {
	const { loginWithEmail } = useLoginUsers();
	const { updateUserContext, userContextData, initialState } = userContexUpdate();

	const [ userData, setUserData ] = useState<intContext>();

	const navigate = useNavigate();
	const userDataRef = useRef<intLoginUserData>();	
	
	useEffect(() => {
		userContextData()
			.then((res) => res && setUserData(res) );

		toast.onChange(result => {
			if(result.status === 'removed' )
				navigate('/profile');
		});
	},[ userData?.userUid]);
	
interface resultUpdateContext extends intContext { message: string }

const handlerLogin = (e: FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	if (userData?.userUid) return;
	const { email, password } = userDataRef.current as intLoginUserData;
	if (email.trim() === '' || password.trim() === '')
		return toast('Fields empty', {
			type: 'error',
			autoClose: 2000
		});
	else {
		loginWithEmail({ email, password })
			.then(async (res) => {
				const { uid, email, message } = res;
				const userName = email?.split('@')[0] || '';
				if (uid && userName) {
					toast.promise( 
						updateUserContext({ ...initialState, userUid: uid, userName })
							.then(res=> {
								const message = res as resultUpdateContext;
								if(message) return toast.error(message as unknown as string);
								else{
									toast.success('Login successful');
								}})
							.catch(err=> {
								toast.error(err);
								console.log(err);})
						,{
							pending: 'Logging in ...',
							error: 'Access denied'
						});
				} else
				if (message)
					toast(message, {
						type: 'error'
					});
			})
			.catch(err => {
				toast(err, {
					autoClose: 2000,
					type: 'error'
				});
				console.log(err);
			});
	}
};

/* form data */
const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
	const { name, value } = e.target;
	const newData = {
		...userDataRef.current,
		[`${name}`]: value
	};
	userDataRef.current = newData as intLoginUserData;
};

const LE = (): JSX.Element => {
	return (
		<div className={styles.containerLoginEmail}>
			<Header props={headerLogin} />
			{
				!userData?.userUid &&
					<div className={styles.formContainer}>
						<div className={styles.logo}>
							<img src={ico} alt="main-logo" />
						</div>
						<form onSubmit={handlerLogin}>
							<label htmlFor="email">Email</label>
							<input onChange={handlerChange}
								type="text" name='email' />
							<label htmlFor="password">Password</label>
							<input onChange={handlerChange} type="password" name='password' />
							<button type="submit">Log in</button>
						</form>
					</div>
			}
		</div>
	);
};

return (
	<>
		<ToastContainer
			autoClose={1000}
			position='bottom-center'
		/>
		{
			userData?.userUid ?
				<ProtectedRoutes
					route='/profile'
					element={<LE />}
					validation={true}
				/>
				: <LE />
		}
	</>

);
};
export default LoginEmail;
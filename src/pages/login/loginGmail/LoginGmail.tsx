import styles from './logingmail.module.css';
import Header, { headerLogin } from '../../../components/header/Header';
import { intContext } from '../../../types';
import { useEffect, useState } from 'react';
import userContexUpdate from '../../../utils/useContextUpdate';
import Loading from 'react-loading';
import { FcGoogle } from 'react-icons/fc';
import useLoginUsers from '../../../hooks/useLoginUsers';
import ProtectedRoutes from '../../../routes/ProtectedRoutes';
import { ToastContainer, toast } from 'react-toastify';

const LoginGmail = () => {
	const { userContextData, updateUserContext, initialState } = userContexUpdate();
	const [userData, setUserData] = useState<intContext>();

	const { loginWithGmail } = useLoginUsers();

	useEffect(() => {
		userContextData()
			.then(res => setUserData(res));
	}, [userData?.userUid]);

	const handlerLogin = ()=> {
		toast.promise(
			loginWithGmail().then(res => {
				if((res as any).message) return toast.error((res as any).message);
				if(res){
					const { displayName, photoURL, uid } = res.user;
					const userName = displayName?.split(' ')[0] || displayName;
					const lastName = displayName?.split(' ')[1] || '';
					if(uid)
						updateUserContext({...initialState,photo: photoURL || '', userUid:uid, userName, lastName })
							.then(res => {
								(res as string) !== 'data writed' ?
									toast.error(res as string) :
									toast.success('Login Successfully', {type: 'success'});
							});
					toast.onChange( res => {
						if(res.status === 'removed')
							setUserData({...initialState, userUid:uid});
					});
				}
			})
				.catch(err=> {
					toast.error(err.message);
					console.log(err.message);
				})
			,
			{
				pending: 'accessing ...'			}
		);
	};	

	return (
		<div className={styles.containerLoginGmail}>
			<Header props={headerLogin} />
			<ToastContainer 
				position="bottom-center"
				autoClose={1000}
			/>
			{
				!userData ?
					<Loading
						type='cylon'
						color='green'
						className='loader'
					/>
					: userData?.userUid ?
						<ProtectedRoutes
							element={<></>}
							route='/profile'
							validation={true}
						/>
						: <div className={styles.ico}>
							<div>
								<FcGoogle/>
								<h1>Sign In</h1>
								<span>to continue to the app</span>
							</div>
							<button onClick={handlerLogin}>Sign In</button>
						</div> 
			}
		</div>
	);
};
export default LoginGmail;
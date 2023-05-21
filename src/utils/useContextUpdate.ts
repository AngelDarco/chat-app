import { useContext } from 'react';
import { Context, initialState } from '../context/Context';
import { intContext } from '../types';
import useRealTimeDB from '../hooks/useRealTimeDB';
import useLoginUsers from '../hooks/useLoginUsers';
/** function to read, update o delete the user context data */
const userContexUpdate = () => {
	const { writeUserData, readUserData } = useRealTimeDB();
	const { logout } = useLoginUsers();

	const { userName, userUid, login, setLogin } = useContext(Context);

	/**	read the user context data */
	const userContextData = async (): Promise<intContext | undefined>=>{
		if(userUid)
			await readUserData('profiles/' + userUid)
				.then(res=> {
					(login && setLogin && res) && setLogin({...login, ...res});
				}).catch(err=> console.log(err));
		return { userName, userUid, ...login };
	};

	/**	 update the user context data  */ 
	const updateUserContext = async(data:intContext) =>{
		const { userName, userUid } = data;

		// set the user data in the local storage
		if(userName)
			globalThis.localStorage.setItem('chatDarcoUserName', userName);
		if(userUid)
			globalThis.localStorage.setItem('chatDarcoUserUid', userUid);

		if(userUid && userName && login && setLogin){	
			setLogin({...login, userUid});
			return writeUserData(data);
		} else if(userName && setLogin && login){
			setLogin({...login, userName});
			return {...login, userName};
		}
	};

	/**  delete the user session and context */ 
	const deleteUserContext = async ()=>{
		return await logout()
			.then((res) => { 
				globalThis.localStorage.removeItem('chatDarcoUserName');
				globalThis.localStorage.removeItem('chatDarcoUserUid');				
				setLogin && setLogin({...initialState}); 
				return res;
			})
			.catch(err => { console.log(err); return err;});
	};

	return { userContextData, updateUserContext, deleteUserContext, initialState };
};
export default userContexUpdate;
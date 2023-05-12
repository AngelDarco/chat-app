import { useContext } from 'react';
import { Context } from '../context/Context';
import { intContext } from '../types';
import useRealTimeDB from '../hooks/useRealTimeDB';

const userContexUpdate = () => {
	const { writeUserData } = useRealTimeDB();
	const { userName, userUid, login, setLogin } = useContext(Context); 

	// return the user context data
	const userContextData = ()=>{
		return { userName, userUid, login, setLogin };
	};

	// update the user context data 
	const updateUserContext = (data:intContext)=>{
		const { userName, userUid } = data;
		if(setLogin)
			setLogin({
				...login,
				...data
			});
		// set the user data in the local storage
		if(userName)
			globalThis.localStorage.setItem('chatDarcoUserName', userName);
		if(userUid)
			globalThis.localStorage.setItem('chatDarcoUserUid', userUid);

		if(userUid){
			// writeUserData()
		}
		
	};

	const deleteUserContext = ()=>{
		console.log('deleteUserContext');
        
	};

	return { userContextData, updateUserContext, deleteUserContext };
};
export default userContexUpdate;
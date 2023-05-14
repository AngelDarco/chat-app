import { useContext } from 'react';
import { Context, initialState } from '../context/Context';
import { intContext } from '../types';
import useRealTimeDB from '../hooks/useRealTimeDB';

const userContexUpdate = () => {
	const { writeUserData } = useRealTimeDB();
	const { userName, userUid, login, setLogin } = useContext(Context);

	// return the user context data
	const userContextData = (): intContext=>{
		return { userName, userUid, login };
	};

	// update the user context data 
	const updateUserContext = async(data:intContext) =>{
		const { userName, userUid } = data;
		
		// set the user data in the local storage
		if(userName)
			globalThis.localStorage.setItem('chatDarcoUserName', userName);
		if(userUid)
			globalThis.localStorage.setItem('chatDarcoUserUid', userUid);

		if(userUid && userName && setLogin){
			setLogin({
				...login,
				...data
			});			
			return writeUserData(data);
		} else if(userName && setLogin && login){
			console.log('in the local ', data);

			setLogin({
				...login,
				userName
			});
		}
		

	};

	const deleteUserContext = ()=>{
		console.log('deleteUserContext');

	};

	return { userContextData, updateUserContext, deleteUserContext, initialState };
};
export default userContexUpdate;
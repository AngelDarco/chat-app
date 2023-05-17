import { useContext } from 'react';
import { Context, initialState } from '../context/Context';
import { intContext } from '../types';
import useRealTimeDB from '../hooks/useRealTimeDB';

const userContexUpdate = () => {
	const { writeUserData, readUserData } = useRealTimeDB();
	const { userName, userUid, login, setLogin } = useContext(Context);

	// read the user data from the database if exist and return the user context data
	const userContextData = async (): Promise<intContext | undefined>=>{
		if(userUid)
			await readUserData('profiles/' + userUid)
				.then(res=> {
					(login && setLogin && res) && setLogin({...login, ...res});
				}).catch(err=> console.log(err));
		return { userName, userUid, ...login };
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
			return writeUserData(data);
		} else if(userName && setLogin && login){
			return readUserData();
		}
		
	};

	const deleteUserContext = ()=>{
		console.log('deleteUserContext');

	};

	return { userContextData, updateUserContext, deleteUserContext, initialState };
};
export default userContexUpdate;
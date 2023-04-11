import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update, query, orderByChild, limitToLast } from 'firebase/database';
import { intUpdateUserData, /* intWrite, */ message } from '../types';
import { firebaseConfig as fbConfig } from '../firebase/firebase-config';

//  Firebase project configuration
const firebaseConfig = {
	...fbConfig,
	databaseURL: 'https://chat-firebase-1baf2-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

const useRealTimeDB = ()=>{

	function readUserData(userDB: string | null = '/public/') : Promise<message[]>{
		if(!userDB) userDB = '/public/';

		const starCountRef = query(ref(db, userDB), orderByChild('messageSendTime'), limitToLast(500));
		return new Promise(resolve => {
			onValue(starCountRef, (snapshot) => {
				const res: message[] = [];
				snapshot.forEach(element => {
					res.push(element.val());
				});
				resolve(res);
			});
		});
	}

	// function writeUserData({userDB='public', messageId, userName, message}:intWrite): void {
	// 	console.log(userDB);
	// 	/* set(ref(db, userDB +'/' + messageId), {
	// 		userName: userName,
	// 		message: message,
	// 	}); */
	// }


	interface newUpdate{
		messageId?: string
	}
	interface UP{
		[key: string]: intUpdateUserData & newUpdate
	}
	function updateUserData({ userName, message, messageSendTime, messageId, userDB }:intUpdateUserData) {
		if(!userDB) userDB = '/public/';
		// A post entry.
		const postData: UP = {
			props:{
				userName: userName,
				message:message,
				messageSendTime: messageSendTime
			} as intUpdateUserData & newUpdate
		};
	
		// Write the new post's data simultaneously in the posts list and the userId's post list.
		const updates: UP = {};
		updates[userDB + '/'+ messageId] = postData['props'];
		return update(ref(db), updates);
	}

	return { readUserData,/*  writeUserData, */ updateUserData };
};
export default useRealTimeDB;
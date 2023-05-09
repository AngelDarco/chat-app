import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update, query, orderByChild, limitToLast, set } from 'firebase/database';
import { intUpdateUserData, intWriteProfiles } from '../types';
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

const useRealTimeDB = () => {
	// function to read the user Data from the firebase server 
	async function readUserData<T>(userDB = '/public/'): Promise<T> {
		const obj: T = {} as T;
		const arr: T = [] as T;
		const data = <T>(res: T, resolve: (value: T) => void) => {
			const starCountRef = query(ref(db, userDB), orderByChild('messageSendTime'), limitToLast(150));

			onValue(starCountRef, (snapshot) => {
				snapshot.forEach(element => {
					if (Array.isArray(res)) {
						res.push(element.val());
					} else {
						res = {
							...res,
							[element.key as string]: element.val()
						};
					}
				});
				resolve(res);
			});
		};
		return new Promise<T>((resolve, reject) => {
			if (userDB === '/public/') {
				data(arr, resolve);
			} else if (typeof userDB === 'string' && userDB !== '/public/') {
				data(obj, resolve);
			} else {
				reject(new Error('invalid database path'));
			}
		});
	}

	// function to write the user Data in the firebase server 
	async function writeUserData( props: intWriteProfiles): Promise<string | Error> {
		if(!props) return Promise.reject(new Error('no data found'));
		if(!props.userName || !props.lastName || !props.userUid) return Promise.reject(new Error('userUid, userName, lastName are required'));
		try {
			const { userUid, photo, userName, lastName, state, about } = props;
		
			await set(ref(db, 'profiles/' + userUid), {
				photo,
				userName,
				lastName,
				state,
				about
			});
			return 'data writed';
		} catch (error) {
			return error as Error;
		}
	}

	// function to update the user messages in the firebase server 
	interface newUpdate { messageId?: string }
	interface UP { [key: string]: intUpdateUserData & newUpdate }
	
	function updateUserData( props: intUpdateUserData): Promise<Error | string>{
		if(!props) return Promise.reject(new Error('no data found'));
		if(!props.messageId ) return Promise.reject('userDB and messageId are required');
		const { userName, message, messageSendTime, messageId, userDB='/public/' } = props;
		
		// A post entry.
		const postData: UP = {
			props: {
				userName: userName,
				message: message,
				messageSendTime: messageSendTime
			} as intUpdateUserData & newUpdate
		};

		// Write the new post's data simultaneously in the posts list and the userId's post list.
		const updates: UP = {};
		updates[userDB + '/' + messageId] = postData['props'];
		return new Promise((resolve, reject)=>{
			update(ref(db), updates)
				.then( () => {
					return resolve('data updated');
				})
				.catch(err =>{
					return reject(err);
				});
		});
	}

	return { readUserData, writeUserData, updateUserData };
};
export default useRealTimeDB;
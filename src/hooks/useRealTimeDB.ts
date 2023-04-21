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
	async function readUserData<T>(userDB = '/public/'): Promise<T> {
		const starCountRef = query(ref(db, userDB), orderByChild('messageSendTime'), limitToLast(150));
		const arr: T = [] as T;
		const obj: T = {} as T;

		const data = <T>(res: T, resolve: (value: T) => void)=> {
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
			} else if (userDB && userDB !== 'public/') {
				data(obj, resolve);
			} else {
				reject(new Error('Invalid user database path'));
			}
		});
	}


	async function writeUserData({ userUid, photo, userName, lastName, state, about }: intWriteProfiles) {
		try {
			const res = await set(ref(db, 'profiles/' + userUid), {
				photo,
				userName,
				lastName,
				state,
				about
			});
			return res;
		} catch (error) {
			return error;
		}
	}


	interface newUpdate { messageId?: string }
	interface UP { [key: string]: intUpdateUserData & newUpdate }
	function updateUserData({ userName, message, messageSendTime, messageId, userDB }: intUpdateUserData) {
		if (!userDB) userDB = '/public/';
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
		return update(ref(db), updates);
	}

	return { readUserData, writeUserData, updateUserData };
};
export default useRealTimeDB;
import { getAuth,  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { intLoginUserData } from '../types';

const useLoginUsers = () => {
	const auth = getAuth();
	
	interface intData extends User { message?: string }
	const loginWithEmail = async ({email,password}:intLoginUserData):Promise<intData> =>{
		try {
			const userCredentials = await signInWithEmailAndPassword(auth, email, password);
			return userCredentials.user;
		} catch (err) {
			return err as intData;
		}
	};

	const loginWithGmail = ()=>{
		const auth = getAuth();
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};

	return { loginWithEmail, loginWithGmail };
};
export default useLoginUsers;
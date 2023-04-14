import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { intLoginUserData } from '../types';

const useLoginUsers = () => {
	const auth = getAuth();

	const loginWithEmail = async ({email,password}:intLoginUserData) =>{
		try {
			const userCredentials = await signInWithEmailAndPassword(auth, email, password);
			return userCredentials.user;
		} catch (err) {
			return err;
		}
	};

	



	const loginWithPhone = (container:string, phone:string)=>{
		// const log = ()=>{
		// 	signInWithPhoneNumber(auth, phone, appVerifier)
		// 	.then(result => {
		// 		window.confirmationResult = result;
		// 		console.log('done: ', window.confirmationResult);
		// 	}).catch(err=> console.log(err));
		
		// };


		// auth.languageCode = 'en';
		// window.recaptchaVerifier = new RecaptchaVerifier(container,{
		// // 	'size': 'normal',
		// // 	'callback': (response) => {
				
		// // 		setTimeout(() => {
		// // 			log();
		// // 			console.log(response);
					
		// // 		}, 3000);
		// // 	},
		// // 	'expired-callback': ()=> console.log('time out')
		// }, auth);

		// const appVerifier = window.recaptchaVerifier;
		// appVerifier.render();

		// setTimeout(() => {
		// 	log();
		// 	console.log('response done ...');
			
		// }, 20000);

	};



	return { loginWithEmail, loginWithPhone };
};
export default useLoginUsers;
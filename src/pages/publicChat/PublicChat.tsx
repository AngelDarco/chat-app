import React, { useContext, useRef, useState } from 'react';
import Header, { headerUser } from '../../components/header/Header';
import styles from './publicChat.module.css';
import { Context } from '../../context/Context';
import { v4 as uuidv4 } from 'uuid';
import Messages from '../../components/messages/Messages';
import useRealTimeDB from '../../firebase/useRealTimeDB';
import { intContext, intUpdateUserData } from '../../types';

interface intPublicData { userLoginData: intContext, load: boolean, setLoad: React.Dispatch<React.SetStateAction<boolean>> }

const PublicChat = (): JSX.Element => {
	// get firebase functions
	const { updateUserData } = useRealTimeDB();
	// get the user context data
	const userLoginData: intContext = useContext(Context);
	// useref of input of the messages to be sended
	const messageRef: string | React.MutableRefObject<null> = useRef(null);

	// usestate to reload with new messages added
	const [load, setLoad] = useState<boolean>(true);

	// send the messages to the firebase server
	const handlerMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const text: React.MutableRefObject<null> | string = ((messageRef?.current as unknown) as HTMLInputElement)?.value ?? '';

		if (!text || text.trim() === '') return;

		const writeData: intUpdateUserData = {
			userDB: userLoginData.userId,
			messageId: uuidv4(),
			userName: userLoginData.userName,
			message: text,
			messageSendTime: new Date().getTime(),
		};
		updateUserData(writeData);
		setLoad(true);
		(e.target as HTMLFormElement).reset();
	};

	const props: intPublicData = {
		userLoginData: userLoginData, 
		load: load, 
		setLoad: setLoad
	};

	return (
		<div className={styles.containerPublicChat}>
			<Header props={headerUser} />
			<div className={styles.publicChatContainer}>
				{
					(userLoginData.userName || load) ?
						<Messages props={{props}} /> :
						<SetName />
				}
				<div className={styles.publicChatFunctions}>
					<form onSubmit={handlerMessage}>
						<textarea ref={messageRef} placeholder='message'/>
						<button>Send</button>
					</form>
				</div>
			</div>
		</div>
	);
};

const SetName = (): JSX.Element => {
	const userLoginData = useContext(Context);
	const usernameRef = useRef(null);
	const alertRef = useRef<HTMLLabelElement>(null);

	const handlerUserName = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const text: React.MutableRefObject<null> | string = ((usernameRef.current as unknown) as HTMLInputElement)?.value ?? '';
		const alert: HTMLLabelElement | null = alertRef?.current;

		// get the state to change context values
		const { setLogin } = userLoginData;

		// Verify the nickname most be more than 3 letters
		if (text.length < 3 && alert) {
			((alert as unknown) as HTMLLabelElement).innerHTML = 'Please fill the fields correctly';
			setTimeout(() => {
				((alert as unknown) as HTMLLabelElement).textContent = '';
			}, 3000);
			return;
		}
		// Storage userName in the localStorage
		window.localStorage.setItem('chatDarcoUserName', text);
		// Change the properties in the context userName
		setLogin &&
			setLogin({ ...userLoginData, userName: text });
	};

	return (
		<div className={styles.userNameContainer}>
			<form onSubmit={handlerUserName}>
				<input type="text" ref={usernameRef} placeholder='Choose an username' />
				<button>Go!</button>
			</form>
			<label ref={alertRef}></label>
		</div>
	);
};

export default PublicChat;
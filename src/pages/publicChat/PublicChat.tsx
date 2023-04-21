import React, { useContext, useEffect, useRef, useState } from 'react';
import Header, { headerUser } from '../../components/header/Header';
import styles from './publicChat.module.css';
import { Context } from '../../context/Context';
import { v4 as uuidv4 } from 'uuid';
import Messages from '../../components/messages/Messages';
import useRealTimeDB from '../../hooks/useRealTimeDB';
import { intContext, intUpdateUserData, message } from '../../types';
import getMessagesOfServer from '../../utils/getMessagesOfServer';
import Loading from '../../components/loading/Loading';

const PublicChat = (): JSX.Element => {

	const { readUserData } = useRealTimeDB();
	const [messages, setMessages] = useState<message[]>();

	// get firebase functions
	const { updateUserData } = useRealTimeDB();
	// get the user context data
	const userLoginData: intContext = useContext(Context);


	/* enable send messages options */
	// useref of input of the messages to be sended
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const btnSendRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		let availability = true;
		const input = messageRef.current;
		const btn = btnSendRef.current;
		if (btn && input) {
			if (userLoginData.userName?.trim()) availability = false;
			btn.disabled = availability; input.disabled = availability;
		}
	}, [userLoginData.userName]);



	// send the messages to the firebase server
	const handlerMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (messageRef && messageRef.current) {
			const text = messageRef.current.value;

			if (!text || text.trim() === '') return;

			const writeData: intUpdateUserData = {
				userDB: undefined,
				messageId: uuidv4(),
				userName: userLoginData.userName,
				message: text,
				messageSendTime: new Date().getTime(),
			};
			updateUserData(writeData);
			(e.target as HTMLFormElement).reset();
		}
	};

	useEffect(() => {
		async function example() {
			try {
				const userData = await readUserData<message[]>('/public/');
				setMessages(userData);
			} catch (error) {
				console.error(error);
			}
		}
		example();

	}, []);


	return (
		<div className={styles.containerPublicChat}>
			<Header props={headerUser} />
			<div className={styles.publicChatContainer}>
				{
					userLoginData.userName &&
						messages ?
						<Messages messages={messages} /> :
						<SetName />
				}
				<div className={styles.publicChatFunctions}>
					<form onSubmit={handlerMessage}>
						<textarea ref={messageRef} placeholder='message' disabled />
						<button ref={btnSendRef} disabled>Send</button>
					</form>
				</div>
			</div>
		</div>
	);
};

const SetName = (): JSX.Element => {
	// get the state to change context values
	const { login, setLogin } = useContext(Context);
	const usernameRef = useRef(null);
	const alertRef = useRef<HTMLLabelElement>(null);

	const handlerUserName = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const text: React.MutableRefObject<null> | string = ((usernameRef.current as unknown) as HTMLInputElement)?.value ?? '';
		const alert: HTMLLabelElement | null = alertRef?.current;

		// Verify the nickname most be more than 3 letters
		if (text.trim() === '') {
			(e.target as HTMLFormElement).reset();
			((alert as unknown) as HTMLLabelElement).innerHTML = 'Please enter a valid username';
			setTimeout(() => {
				((alert as unknown) as HTMLLabelElement).textContent = '';
			}, 3000);
			return;
		} else if (text.length < 3 && alert) {
			((alert as unknown) as HTMLLabelElement).innerHTML = 'Please choose an username';
			setTimeout(() => {
				((alert as unknown) as HTMLLabelElement).textContent = '';
			}, 3000);
			return;
		}
		// Storage userName in the localStorage
		window.localStorage.setItem('chatDarcoUserName', text);
		// Change the properties in the context userName
		if (setLogin && login)
			setLogin({ ...login, userName: text });
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
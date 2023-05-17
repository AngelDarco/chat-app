import React, { useEffect, useRef, useState } from 'react';
import Header, { headerUser } from '../../components/header/Header';
import styles from './publicChat.module.css';
import { v4 as uuidv4 } from 'uuid';
import Messages from '../../components/messages/Messages';
import useRealTimeDB from '../../hooks/useRealTimeDB';
import { intUpdateUserData, message } from '../../types';
import Loading from 'react-loading';
import LoginGuests from '../../components/loginguests/LoginGuests';
import userContexUpdate from '../../utils/useContextUpdate';
// import Loading from '../../components/loading/Loading';

const PublicChat = (): JSX.Element => {
	// get firebase functions
	const { readUserData, updateUserData } = useRealTimeDB();
	
	// get the user context data
	const { userContextData } = userContexUpdate();
	const { userName } = userContextData();

	const [messages, setMessages] = useState<message[]>();

	/* enable send messages options */
	// useref of input of the messages to be sended
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const btnSendRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		let availability = true;
		const input = messageRef.current;
		const btn = btnSendRef.current;
		if (btn && input) {
			if (userName?.trim()) availability = false;
			btn.disabled = availability; input.disabled = availability;
		}
	}, [userName]);


	// send the messages to the firebase server
	const handlerMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (messageRef && messageRef.current) {
			const text = messageRef.current.value;
			if (!text || text.trim() === '') return;

			const writeData: intUpdateUserData = {
				userDB: undefined,
				messageId: uuidv4(),
				userName: userName,
				message: text,
				messageSendTime: new Date().getTime(),
			};

			updateUserData(writeData)
				.then(() => getData());
			(e.target as HTMLFormElement).reset();
		}
	};

	/* get messages from firebase server */
	async function getData() {
		try {
			const userData = await readUserData<message[]>('/public/');
			setMessages(() => userData);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if(userName)
			getData();
	}, [userName]);

	return (
		<div className={styles.containerPublicChat}>
			<Header props={headerUser} />
			<div className={styles.publicChatContainer}>
				{
					!userName ?
						<LoginGuests /> :
						messages ?
							<Messages messages={messages} />
							: <Loading
								type='cylon'
								color='green'
								className='loader'
							/>
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


export default PublicChat;
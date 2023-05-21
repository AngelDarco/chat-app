import React, { useEffect, useRef, useState } from 'react';
import Header, { headerUser } from '../../components/header/Header';
import styles from './publicChat.module.css';
import { v4 as uuidv4 } from 'uuid';
import Messages from '../../components/messages/Messages';
import useRealTimeDB from '../../hooks/useRealTimeDB';
import { intContext, intUpdateUserData, message } from '../../types';
import Loading from 'react-loading';
import LoginGuests from '../../components/loginguests/LoginGuests';
import userContexUpdate from '../../utils/useContextUpdate';

const PublicChat = (): JSX.Element => {
	// get firebase functions
	const { readUserData, updateUserData } = useRealTimeDB();
	
	// get the user context data
	const { userContextData } = userContexUpdate();

	//store and update user context data
	const [ userData, setUserData ] = useState<intContext>();
	const [messages, setMessages] = useState<message[]>();

	/* enable send messages options */
	// useref of input of the messages to be sended
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const btnSendRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		// update the user context data
		userContextData()
			.then(res => setUserData(res))
			.catch(err => console.log(err));

		// get the public messages
		if(userData?.userName)
			getData();

		/** avalibility of the send button */
		let availability = true;
		const input = messageRef.current;
		const btn = btnSendRef.current;
		if (btn && input) {
			if (userData?.userName?.trim()) availability = false;
			btn.disabled = availability; input.disabled = availability;
		}
	}, [userData?.userName]);

	const updateLocalUserData = (data: intContext):void =>{
		setUserData(data);
	};

	// send the messages to the firebase server
	const handlerMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (messageRef && messageRef.current) {
			const text = messageRef.current.value;
			if (!text || text.trim() === '') return;

			const writeData: intUpdateUserData = {
				userDB: undefined,
				messageId: uuidv4(),
				userName: userData?.userName || null,
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

	return (
		<div className={styles.containerPublicChat}>
			<Header props={headerUser} />
			<div className={styles.publicChatContainer}>
				{
					!userData ? <Loading
						type='cylon'
						color='green'
						className='loader'
					/>	:
						!userData?.userName ?
							<LoginGuests updateLocalUserData={updateLocalUserData} /> :
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
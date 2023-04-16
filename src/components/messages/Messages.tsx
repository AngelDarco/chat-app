import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './messages.module.css';
import useRealTimeDB from '../../hooks/useRealTimeDB';
import { message } from '../../types';

interface Props { props: { userDB:string | undefined, load: boolean, setLoad: React.Dispatch<React.SetStateAction<boolean>> } }
interface intProps {
	props: Props
}

const Messages = ({ props }: intProps): JSX.Element => {
	const { userDB, load, setLoad } = props.props;
	// get firebase functions
	const { readUserData } = useRealTimeDB();
	// state to store the messages
	const [messages, setMessages] = useState<message[]>([]);
	// useref of container of messages
	const containerMessagesRef = useRef<HTMLDivElement | null>(null);
	const container = containerMessagesRef?.current;

	// get messages from firebase server
	useEffect(() => {
		if (!load) return;
		readUserData(userDB).then(res => setMessages(res));
		setLoad(false);
	}, [load]);

	useEffect(() => {
		if (container?.hasChildNodes()) {
			const lastChild = container?.lastChild as HTMLElement;
			lastChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [messages.length]);


	return (
		<div className={styles.publicChatMessages} ref={containerMessagesRef}>
			{
				messages?.map((item: message): ReactNode => {
					const time = new Date(item.messageSendTime).toLocaleString();
					return (
						<div key={item.messageSendTime} className=
							{styles.messageSend}>
							<span>{item.userName}</span>
							<div className={styles.message}>
								<span>{item.message}</span>
								<span className=
									{styles.messageTime}>send on: {time}</span>
							</div>
						</div>
					);
				})
			}
		</div>
	);
};
export default Messages;
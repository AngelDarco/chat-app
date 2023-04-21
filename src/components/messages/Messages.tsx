import { ReactNode } from 'react';
import styles from './messages.module.css';
import { message } from '../../types';
import Loading from '../loading/Loading';

interface Props{ messages: message[] }
const Messages = ( messages:Props): JSX.Element => {
	console.log(messages.messages, 'messages');
	
	return (
		<div className={styles.publicChatMessages}>
			{
				messages.messages && messages.messages.length === 0 ? <Loading />
					:
					messages.messages?.map((item: message): ReactNode => {
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
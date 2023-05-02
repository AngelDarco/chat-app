import { ReactNode, useEffect, useRef } from 'react';
import styles from './messages.module.css';
import { message } from '../../types';

interface Props { messages: message[] }
const Messages = (messages: Props): JSX.Element => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		container?.lastElementChild?.scrollIntoView({
			behavior: 'auto',
			block: 'end'
		});
	}, [containerRef.current?.lastElementChild]);

	return (
		<div ref={containerRef} className={styles.publicChatMessages}>
			{
				messages.messages &&
				messages?.messages.map((item: message): ReactNode => {
					const time = new Date(item.messageSendTime).toLocaleString();
					return (
						<div key={item.messageSendTime} className={styles.messageSend}>
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
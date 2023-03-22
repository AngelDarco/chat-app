import React from 'react';
import Header, { headerUser } from '../../components/header/Header';
import styles from './publicChat.module.css';


const PublicChat = (): JSX.Element =>{
	return(
		<div className={styles.containerPublicChat}>
			<Header props={headerUser} />
			<div className={styles.publicChatContainer}>
				<div className={styles.publicChatFunctions}>
					<input type="text" />
					<button>Send</button>
				</div>
			</div>
		</div>
	);
};

export default PublicChat;
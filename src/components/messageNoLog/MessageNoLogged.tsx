import styles from './messageNoLogged.module.css';

const MessageNoLogged = (): JSX.Element => {
	return (
		<div className={styles.containerMessageNoLogged}>
			<h5> you must be loged to see this section </h5>
		</div>
	);
};
export default MessageNoLogged;
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Loading from 'react-loading';
import userContexUpdate from '../../utils/useContextUpdate';

const Logout = () => {
	const navigate = useNavigate();
	const uid = window.localStorage.getItem('chatDarcoUserUid');	
	
	const handlerLogout = () => {
		const { deleteUserContext } = userContexUpdate();
		uid &&
			Swal.fire({
				title: 'You wanna close session?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Yes'
			}).then((result) => {
				if (result.isConfirmed) {
					deleteUserContext()
						.then(res => {
							!res ?
								(Swal.fire({
									title: 'Session Closed',
									icon: 'success',
									showConfirmButton: false,
									timer: 1000
								}
								), setTimeout(() => navigate('/'), 1100))
								: (Swal.fire({
									title: res,
									icon: 'error',
									timer: 1000
								}), setTimeout(() => navigate(-1), 1100));
						});
				}else{ navigate(-1); }
			});
		return <Loading
			type='cylon'
			color='green'
			className={styles.style.toString()}
		/>;
	};

	return(
		<div style={styles.style}>
			{ handlerLogout() }
		</div>
	);
};
export default Logout;
const styles={
	style: {
		width: '100%',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		padding: '50px 0',
	}
};
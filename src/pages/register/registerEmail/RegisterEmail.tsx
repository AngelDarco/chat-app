import { useContext, useEffect, useRef } from 'react';
import Header, { headerRegister } from '../../../components/header/Header';
import useRegisterUsers from '../../../hooks/useRegisterUsers';
import styles from './registeremail.module.css';
import { toast } from 'react-toastify';
import { Context } from '../../../context/Context';
import { useNavigate } from 'react-router';
// import logo from '../../assets/img/ico.png';

const Register = (): JSX.Element =>{
	const { createAcountWithEmail } = useRegisterUsers();
	
	interface intInputs{name:string,email:string,password:string,password2:string}
	const data: intInputs = {name:'',email:'',password:'',password2:''}; 
	const userDataRef = useRef<intInputs>(data);
	const { login, setLogin } = useContext(Context);
	const navigate = useNavigate();
	useEffect(()=>{
		if(login?.userUid)
			navigate('/home');
	},[login?.userUid]);


	const handlerSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
		e?.preventDefault();
		const ud = userDataRef.current;
		const obj = Object.values(ud);

		if(obj.filter((i:string)=> i.trim()==='').length > 0) {
			toast('Empty fields',{
				type: 'warning',
				position: 'bottom-center'
			});
			return;
		}else if(Object(ud)['password'] !== Object(ud)['password2']){
			toast('Passwords doesnt match',{
				type: 'error',
				position: 'bottom-center'
			});
		}else if(Object(ud)['name'].length <= 2){
			toast('Name must have at least 3 letters',{
				type: 'warning',
				position: 'bottom-center'
			});
		}else{
			
			toast.promise(createAcountWithEmail(ud)
				.then(res =>{
				// eslint-disable-next-line
				const { message, uid, email } = res; 
					if(message){
						toast(message.split(':')[1],{
							type: 'error',
							position: 'bottom-center'
						});
						return;
					}else if(uid){
						toast('Register add',{
							type: 'success',
							position: 'bottom-center'
						});
						if(login && setLogin)
							setLogin({...login, userName: email.split('@')[0], userUid: uid});
						return;
					}
				})
				.catch(err => {
					toast('Error: '+err,{
						type: 'error',
						position: 'bottom-center'
					});
				}),{
				pending: 'Working on it',
				error: 'Ups, error in the matrix'
			});
		}
	};

	const handlerInputs = (e: React.ChangeEvent<HTMLInputElement> | undefined)=>{
		const names = e?.target.name;
		const value = e?.target.value;
		
		if(names){
			const newRef = {
				...userDataRef.current,
				[names] : value };			
			userDataRef.current = newRef;
		}
	};

	return(
		<div className={styles.containerRegisterEmail}>
			<Header props={headerRegister} />
			{
				!login?.userUid &&
			<form onSubmit={handlerSubmit}>
				<label htmlFor="name">Name</label>
				<input onChange={handlerInputs} type="text" name='name' />
				<label htmlFor="email">Email</label>
				<input onChange={handlerInputs} type="email" name="email"/>
				<label htmlFor="password">Password</label>
				<input onChange={handlerInputs} type="password" name="password"/>
				<label htmlFor="password2">Repet password</label>
				<input onChange={handlerInputs} type="password" name="password2"/>
				<button type="submit">Register</button>
			</form>
			}
		</div>
	);
};

export default Register;
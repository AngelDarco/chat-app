import styles from './profilecongif.module.css';
import Header, { headerUser } from '../../../components/header/Header';
import { useContext, useEffect, useRef, useState } from 'react';
import useProfileUpdate from '../../../hooks/useProfileUpdate';
import { Context } from '../../../context/Context';
import { toast, ToastContainer } from 'react-toastify';

import profileIco from '../../../assets/img/profile.png';
import { intWriteProfiles } from '../../../types';

const ProfileConfig = () => {
	const { userUid } = useContext(Context);
	if (!userUid) return;
	/* Storage images in the firebase server */
	const { storageImgs, writeUserData, readUserData } = useProfileUpdate();

	/* state to change image of profile view */
	const [img, setImg] = useState<string>(profileIco);

	/* iniatial data */
	const initialData: intWriteProfiles = { photo: '', userUid, userName: '', lastName: '', state: '', about: '', file: undefined };


	/* code to fill the dataref with user info */
	const dataRef = useRef<intWriteProfiles>(initialData);

	/* Read existing user profile data */
	const [profileData, setProfileData] = useState(initialData);
	const nameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const stateRef = useRef<HTMLInputElement>(null);
	const aboutRef = useRef<HTMLTextAreaElement>(null);
	const photoRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const db = 'profiles/' + userUid;
		readUserData(db)
			.then((res:intWriteProfiles) => {
				const { userName,lastName, state, about, photo } = res;
				
				setProfileData({ ...profileData, ...res });

				/* change input values */
				if(nameRef.current)
					nameRef.current.value = userName;
				if(lastNameRef.current)
					lastNameRef.current.value = lastName;
				if(stateRef.current)
					stateRef.current.value = state as string;
				if(aboutRef.current)
					aboutRef.current.value = about as string;
				photoRef.current?.setAttribute('src', photo as string);

				dataRef.current = { ...dataRef.current, ...res};

				/* set userName in localStorage */
				window.localStorage.setItem('chatDarcoUserName',userName);
			})
			.catch(err => console.log(err));
	}, []);

	
	const handlerSendData = () => {
		/* write updated data, with new picture in the server */
		const writeData = (data:intWriteProfiles)=>{
			writeUserData(data)
				.then(() => toast('Done ...', { type: 'success', position: 'bottom-center', autoClose: 500 }))
				.catch(err => console.log(err));
		};
		/* uploading new profile picture to the server*/
		if (dataRef.current?.file) {
			toast.promise(
				storageImgs(userUid, dataRef.current?.file)
					.then(photo => {
						if (photo) {
							dataRef.current.photo = photo;
							writeData(dataRef.current);
						}
					}), {
					pending: 'Accessing',
					error: 'error in the matrix'
				}
			);
			/* write updated data without picture in the server */
		}else writeData(dataRef.current);
	};

	/* fill the user data from inputs and change picture in the shower div */
	const handlerData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		if (name === 'file') {
			if (e.target instanceof HTMLInputElement)
				dataRef.current.file = e.target.files?.[0];
			const file = dataRef.current.file;
			const reader = new FileReader();
			reader.addEventListener('load', (e) => {
				e.target?.result &&
					setImg((e.target.result) as string);
			});
			file &&
				reader.readAsDataURL(file);
			return;
		}
		/* adding new data to the dataRef */
		const newDataRef = {
			...dataRef.current,
			[name]: value
		};
		dataRef.current = newDataRef;
	};

	return (
		<div className={styles.containerProfileConfig}>
			<Header props={headerUser} />
			<div className={styles.sectionProfileConfig}>
				<div className={styles.userImage}>
					<img src={img} alt="user-picture" ref={photoRef} />
					<input onChange={handlerData} type="file" name="file" />
				</div>
				<div className={styles.userData}>
					<div>
						<label htmlFor="userName">Name:</label>
						<input onChange={handlerData} type="text" name='userName' ref={nameRef} required/>
					</div>
					<div>
						<label htmlFor="lastName">Last Name:</label>
						<input onChange={handlerData} type="text" name="lastName" ref={lastNameRef} />
					</div>
					<div>
						<label htmlFor="state">State:</label>
						<input onChange={handlerData} type="text" name='state' ref={stateRef} />
					</div>
					<div>
						<label htmlFor="about">About You:</label>
						<textarea onChange={handlerData} name='about' ref={aboutRef} />
					</div>
				</div>
				<button onClick={handlerSendData}>Save</button>
			</div>
			<ToastContainer />
		</div>
	);
};
export default ProfileConfig;
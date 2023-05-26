import React, { useState } from 'react';
import { intContext } from '../types';
import defaultPhoto from '../assets/img/profile.png';

const defaultValues: intContext = {
	userName: globalThis.localStorage.getItem('chatDarcoUserName'),
	userUid: globalThis.localStorage.getItem('chatDarcoUserUid'),
	lastName: '',
	state: '',
	about: '',
	photo: defaultPhoto || ''
};

const Context = React.createContext(defaultValues);

const MainContext = ({ children }: { children: JSX.Element }): JSX.Element => {
	const [login, setLogin] = useState<intContext>(defaultValues);

	const data: intContext = {...login,login,setLogin};

	return (
		<Context.Provider value={data}>
			{children}
		</Context.Provider>
	);
};

export { MainContext, Context, defaultValues as initialState };
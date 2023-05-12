import React, { useState } from 'react';
import { intContext } from '../types';

const defaultValues : intContext = {
	userName: globalThis.localStorage.getItem('chatDarcoUserName'),
	userUid: globalThis.localStorage.getItem('chatDarcoUserUid'),
};

const Context = React.createContext(defaultValues);

const MainContext = ({children} : {children: JSX.Element}) :  JSX.Element =>{
	const [ login, setLogin ] = useState<intContext>(defaultValues);

	interface intData{
		login: intContext | undefined,
		setLogin: React.Dispatch<React.SetStateAction<intContext>>
	}
	
	interface UP{
		[key: string]: intData & intContext
	}

	const data: UP = {
		props:{
			...login,
			login:login,
			setLogin: setLogin,
		} as intData & intContext
	};

	return(
		<Context.Provider value={data['props']}>
			{children}
		</Context.Provider>
	);
};

export { MainContext, Context };
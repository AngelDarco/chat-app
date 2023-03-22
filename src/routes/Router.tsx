import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Gmail from '../pages/gmail/Gmail';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import PublicChat from '../pages/publicChat/PublicChat';
import Register from '../pages/register/Register';
import User from '../pages/user/User';
import Welcome from '../pages/welcome/Welcome';

const Router = (): JSX.Element =>{
	return(
		<Routes>
			<Route path="/" Component={ Welcome } />
			<Route path="/login" Component={Login } />
			<Route path="/register" Component={ Register } />
			<Route path="/gmail" Component={ Gmail } />

			<Route path="/user" Component={ User } />
			<Route path="/home" Component={ Home } />
			<Route path="/public" Component={ PublicChat } />
		</Routes>
	);
};
export default Router;
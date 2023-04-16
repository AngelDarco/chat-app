import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import PublicChat from '../pages/publicChat/PublicChat';
import User from '../pages/user/User';
import Welcome from '../pages/welcome/Welcome';
import LoginEmail from '../pages/login/loginEmail/LoginEmail';
import LoginGmail from '../pages/login/loginGmail/LoginGmail';
import LoginPhone from '../pages/login/loginPhone/LoginPhone';

import RegisterEmail from '../pages/register/RegisterEmail';


const Router = (): JSX.Element =>{
	return(
		<Routes>
			<Route path="/" Component={ Welcome } />
			<Route path="/login" Component={Login } />

			{/* Routes to Login options */}
			<Route path="/email" Component={ LoginEmail } />
			<Route path="/gmail" Component={ LoginGmail } />
			<Route path="/phone" Component={ LoginPhone } />

			{/* Routes to Register options  */}
			<Route path="/register" Component={ RegisterEmail } />

			{/* Routes to Public access */}
			<Route path="/user" Component={ User } />
			<Route path="/home" Component={ Home } />
			<Route path="/public" Component={ PublicChat } />
		</Routes>
	);
};
export default Router;
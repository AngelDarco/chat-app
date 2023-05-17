import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/profile/Profile';
import Login from '../pages/login/Login';
import PublicChat from '../pages/publicChat/PublicChat';
import User from '../pages/user/User';
import Welcome from '../pages/welcome/Welcome';
import LoginEmail from '../pages/login/loginEmail/LoginEmail';
import LoginGmail from '../pages/login/loginGmail/LoginGmail';
import RegisterEmail from '../pages/register/RegisterEmail';
import ProfileConfig from '../pages/profile/profileconfig/ProfileConfig';


const Router = (): JSX.Element =>{
	return(
		<Routes>
			<Route path="/" Component={ Welcome } />
			<Route path="/login" Component={Login } />

			{/* Routes to Login options */}
			<Route path="/email" Component={ LoginEmail } />
			<Route path="/gmail" Component={ LoginGmail } />

			{/* Routes to Register options  */}
			<Route path="/register" Component={ RegisterEmail } />

			{/* Routes to Public access */}
			<Route path="/user" Component={ User } />
			<Route path="/profile" Component={ Profile } />
			<Route path="/public" Component={ PublicChat } />

			<Route path="/profileconfig" Component={ ProfileConfig } />

		</Routes>
	);
};
export default Router;
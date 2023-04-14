import React from 'react';
import styles from './header.module.css';
import { AiFillHome } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { VscSignIn } from 'react-icons/vsc';
import { BsFillTelephoneForwardFill, BsGoogle } from 'react-icons/bs';
import { SiMicrosoftoutlook } from 'react-icons/si';
import { Link } from 'react-router-dom';

interface icons {
	path: string,
	icon: React.ReactNode,
	userName: string
}

interface Props {
	props: icons[];
}

const Header = (icons : Props): JSX.Element => {
	return (
		<div className={styles.containerHeader}>
			{
				icons.props?.map((item: icons, index: number): React.ReactElement => {
					return (
						<Link key={index} to={item.path}>
							<div>
								{item.icon}
								<span>{item.userName}</span>
							</div>
						</Link>
					);
				})
			}
		</div>
	);
};

// Icons and text of the public header
export const headerPublic: icons[] = [
	{
		path: '/login',
		icon: <VscSignIn />,
		userName: 'login'
	},
	{
		path: '/register',
		icon: <FaUserPlus />,
		userName: 'logUp'
	},
	{
		path: '/',
		icon: <ImExit />,
		userName: 'exit'
	}
];

/* Icosn for header of Login pages */
export const headerLogin:icons[] = [
	{
		path: '/email',
		icon: <SiMicrosoftoutlook />,
		userName: 'email'
	},
	{
		path: '/gmail',
		icon: <BsGoogle />,
		userName: 'gmail'
	},
	{
		path: '/phone',
		icon: <BsFillTelephoneForwardFill/>,
		userName: 'phone'
	},
	{
		path: '/register',
		icon: <FaUserPlus />,
		userName: 'logUp'
	},
	{
		path: '/',
		icon: <ImExit />,
		userName: 'exit'
	}
];

/* Icons for Register pages */
export const headerRegister:icons[] = [
	{
		path: '/emailregister',
		icon: <SiMicrosoftoutlook />,
		userName: 'email'
	},
	{
		path: '/gmailregister',
		icon: <BsGoogle />,
		userName: 'gmail'
	},
	{
		path: '/phoneregister',
		icon: <BsFillTelephoneForwardFill/>,
		userName: 'phone'
	},
	{
		path: '/login',
		icon: <VscSignIn />,
		userName: 'login'
	},
	{
		path: '/',
		icon: <ImExit />,
		userName: 'exit'
	}
];

// Icons and text of the loged user header
export const headerUser: icons[] = [
	{
		path: '/home',
		icon: <FaUser />,
		userName: 'profile'
	},
	{
		path: '/user',
		icon: <AiFillHome />,
		userName: 'home'
	},
	{
		path: '/public',
		icon: <HiChatBubbleLeftRight />,
		userName: 'public'
	},
	{
		path: '/',
		icon: <ImExit />,
		userName: 'exit'
	}
];

export default Header;
import styles from './header.module.css';
import { AiFillHome } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { VscSignIn } from 'react-icons/vsc';
import { BsGoogle } from 'react-icons/bs';
import { BiLeftArrow } from 'react-icons/bi';
import { SiMicrosoftoutlook } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';


interface icons {
	path: string,
	icon: React.ReactNode,
	userName: string
}

interface Props {
	props: icons[];
}

const Header = (icons : Props): JSX.Element => {
	const uid = localStorage.getItem('chatDarcoUserUid');
	const navigate = useNavigate();
	
	/**
	 * This function handles going back to the previous page.
	 */
	const handlerBack = () => {
		navigate(-1);
	};

	return (
		<div className={styles.containerHeader}>
			{
				icons.props?.map((item: icons, index:number): React.ReactElement => {					
					return (
						<Link key={index} to={item.path} onClick={ item.userName === 'back' ? handlerBack : undefined }>
							<div className={ (item.userName === 'exit' && !uid) ? styles.noUid : '' }>
								{ (item.userName === 'exit' && !uid) && (item.path = '') }
								{ item.icon }
								<span>{item.userName}</span>
							</div>
						</Link>
					);
				})
			}
		</div>
	);
};
export default Header;



// Icons and text of the public header
export const headerPublic: icons[] = [
	{
		path: '',
		icon: <BiLeftArrow />,
		userName: 'back'
	},
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
		path: '/logout',
		icon: <ImExit />,
		userName: 'exit'
	}
];

/* Icosn for header of Login pages */
export const headerLogin:icons[] = [
	{
		path: '',
		icon: <BiLeftArrow />,
		userName: 'back'
	},
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
		path: '/register',
		icon: <FaUserPlus />,
		userName: 'logUp'
	},
	{
		path: '/logout',
		icon: <ImExit />,
		userName: 'exit'
	}
];

/* Icons for Register pages */
export const headerRegister:icons[] = [
	{
		path: '',
		icon: <BiLeftArrow />,
		userName: 'back'
	},
	{
		path: '/register',
		icon: <SiMicrosoftoutlook />,
		userName: 'email'
	},
	{
		path: '/login',
		icon: <VscSignIn />,
		userName: 'login'
	},
	{
		path: '/logout',
		icon: <ImExit />,
		userName: 'exit'
	}
];

// Icons and text of the loged user header
export const headerUser: icons[] = [
	{
		path: '',
		icon: <BiLeftArrow />,
		userName: 'back'
	},
	{
		path: '/profile',
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
		path: '/logout',
		icon: <ImExit />,
		userName: 'exit'
	}
];
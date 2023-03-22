import React from 'react';
import styles from './header.module.css';
import { AiFillHome } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { VscSignIn } from 'react-icons/vsc';
import { BsGoogle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface icons {
	path: string,
	icon: React.ReactNode,
	name: string
}

interface Props {
	props: icons[]
}

const Header = ({ props }: Props): JSX.Element => {
	return (
		<div className={styles.containerHeader}>
			{
				props?.map((item: icons, index: number): JSX.Element => {
					return (
						<Link key={index} to={item.path}>
							<div>
								{item.icon}
								<span>{item.name}</span>
							</div>
						</Link>
					);
				})
			}
		</div>
	);
};

export const headerPublic: icons[] = [
	{
		path: '/login',
		icon: <VscSignIn />,
		name: 'login'
	},
	{
		path: '/register',
		icon: <FaUserPlus />,
		name: 'logUp'
	},
	{
		path: '/gmail',
		icon: <BsGoogle />,
		name: 'gmail'
	},
	{
		path: '/',
		icon: <ImExit />,
		name: 'exit'
	}
];

export const headerUser: icons[] = [
	{
		path: '/home',
		icon: <FaUser />,
		name: 'profile'
	},
	{
		path: '/user',
		icon: <AiFillHome />,
		name: 'home'
	},
	{
		path: '/public',
		icon: <HiChatBubbleLeftRight />,
		name: 'public'
	},
	{
		path: '/',
		icon: <ImExit />,
		name: 'exit'
	}
];
export default Header;
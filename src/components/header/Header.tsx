import styles from "./header.module.css";
import { AiFillHome } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { VscSignIn } from "react-icons/vsc";
import { BiLeftArrow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import React, { CSSProperties } from "react";

interface icons {
  path: string;
  icon: React.ReactNode;
  userName: string;
}

interface Props {
  props: icons[];
  styles?: CSSProperties;
}

const Header = (icons: Props): JSX.Element => {
  const uid = localStorage.getItem("chatDarcoUserUid");
  const userName = localStorage.getItem("chatDarcoUserName");

  const navigate = useNavigate();

  /** This function handles going back to the previous page. */
  const handlerBack = () => {
    navigate(-1);
  };

  /** This function handles the logout button visibility. */
  const handlerLogout = (item: icons) => {
    if (
      (item.userName === "logout" && !uid && !userName) ||
      (item.userName === "logout" && !uid && userName)
    ) {
      item.userName = "exit";
      item.path = "/";
    } else if (item.userName === "logout" && uid && userName) {
      item.userName = "logout";
      item.path = "/logout";
    }
    return item.icon;
  };

  return (
    <div className={styles.containerHeader} style={icons.styles}>
      {icons.props?.map((item: icons, index: number): React.ReactElement => {
        return (
          <Link
            key={index}
            to={item.path}
            onClick={item.userName === "back" ? handlerBack : undefined}
          >
            <div
              className={
                item.userName === "logout" && !uid && !userName
                  ? styles.noUid
                  : ""
              }
            >
              {handlerLogout(item)}
              <span>{item.userName}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Header;

// Icons and text of the public header
export const headerPublic: icons[] = [
  {
    path: "",
    icon: <BiLeftArrow />,
    userName: "back",
  },
  {
    path: "/login",
    icon: <VscSignIn />,
    userName: "login",
  },
  {
    path: "/register",
    icon: <FaUserPlus />,
    userName: "logUp",
  },
  {
    path: "/logout",
    icon: <ImExit />,
    userName: "logout",
  },
];

// Icons and text of the personal chats header
export const headerPersonalChats: icons[] = [
  {
    path: "",
    icon: <BiLeftArrow />,
    userName: "back",
  },
  {
    path: "/logout",
    icon: <ImExit />,
    userName: "logout",
  },
];

/* Icosn to the Login pages */
export const headerLogin: icons[] = [
  {
    path: "",
    icon: <BiLeftArrow />,
    userName: "back",
  },
  {
    path: "/register",
    icon: <FaUserPlus />,
    userName: "register",
  },
  {
    path: "/logout",
    icon: <ImExit />,
    userName: "logout",
  },
];

/* Icons for Register pages */
export const headerRegister: icons[] = [
  {
    path: "",
    icon: <BiLeftArrow />,
    userName: "back",
  },
  {
    path: "/login",
    icon: <VscSignIn />,
    userName: "login",
  },
  {
    path: "/logout",
    icon: <ImExit />,
    userName: "logout",
  },
];

// Icons of the loged user header
export const headerUser: icons[] = [
  {
    path: "",
    icon: <BiLeftArrow />,
    userName: "back",
  },
  {
    path: "/profile",
    icon: <FaUser />,
    userName: "profile",
  },
  {
    path: "/home",
    icon: <AiFillHome />,
    userName: "home",
  },
  {
    path: "/public",
    icon: <HiChatBubbleLeftRight />,
    userName: "public",
  },
  {
    path: "/logout",
    icon: <ImExit />,
    userName: "logout",
  },
];

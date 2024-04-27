/* eslint-disable react/no-unknown-property */
import styles from "./welcome.module.css";
import { Link } from "react-router-dom";
import { VscSignIn } from "react-icons/vsc";
import { FaUserPlus } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

import img from "../../assets/main.gif";
import mainLogo from "../../assets/main.mp4";
import { useEffect, useRef } from "react";

const Welcome = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.3;
  }, []);

  return (
    <div className={styles.containerMain}>
      <img src={img} alt=" main-logo" width={300} />

      <video autoPlay loop muted ref={videoRef}>
        <source src={mainLogo} type="video/mp4" />
      </video>

      <div className={styles.containerText}>
        <div className={styles.textMain}>
          <h1> Welcome to our chat app</h1>
          <p>
            Login or register to start using our app, and connect with your
            friends around the world
          </p>
        </div>

        <div className={styles.linksMain}>
          <Link to={"/login"}>
            {" "}
            <VscSignIn /> Login
          </Link>
          <Link to={"/register"}>
            {" "}
            <FaUserPlus />
            New User? Sign Up
          </Link>
          <Link to={"/public"}>
            {" "}
            <HiChatBubbleLeftRight />
            Check it out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

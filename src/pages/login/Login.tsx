import styles from "./login.module.css";
import globalStyles from "../../css/global.module.css";
import { Link } from "react-router-dom";
import Header, { headerLogin } from "../../components/header/Header";
import { AiOutlineGoogle } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";

import loginImg from "../../assets/main.gif";

const Login = () => {
  return (
    <div className={styles.containerLogin}>
      <Header props={headerLogin} />
      <div className={styles.logo}>
        <img src={loginImg} alt="main-logo" />
      </div>
      <div className={`${styles.links} ${globalStyles.glass}`}>
        <h1>Login</h1>
        <div className={styles.email}>
          <Link to={"/email"}>
            <MdOutlineAlternateEmail /> Login with Email
          </Link>
        </div>
        <div className={styles.gmail}>
          <Link to={"/gmail"}>
            <AiOutlineGoogle /> Login with Gmail
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;

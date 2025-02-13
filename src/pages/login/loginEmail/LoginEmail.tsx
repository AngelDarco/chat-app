import styles from "./loginemail.module.css";
import globalStyles from "../../../css/global.module.css";
import profileImg from "../../../assets/profile.png";
import registerImg from "../../../assets/login.gif";
import Header, { headerLogin } from "../../../components/header/Header";
import { ChangeEvent, FormEvent, useContext, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { LoginData } from "../../../types";
import useLoginUsers from "../../../hooks/useLoginUsers";
import userContexUpdate from "../../../utils/useContextUpdate";
import ProtectedRoutes from "../../../routes/ProtectedRoutes";
import { Context } from "../../../context/Context";

const LoginEmail = (): JSX.Element => {
  const { loginWithEmail } = useLoginUsers();
  const { updateUserContext, userContextData, initialState } =
    userContexUpdate();

  const { login } = useContext(Context)

  const userDataRef = useRef<LoginData>();
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    userContextData()
  }, []);

  const handlerLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login?.userUid) return;
    const { email, password } = userDataRef.current as LoginData;
    if (email.trim() === "" || password.trim() === "")
      return toast("Fields empty", {
        type: "error",
        autoClose: 1000,
      });
    else {
      // disable login button after 1 login try
      submitRef.current?.setAttribute("disabled", "true");
      loginWithEmail({ email, password })
        .then((res) => {
          const { uid, email, message } = res;
          const userName = email?.split("@")[0] || "";
          if (uid && userName) {
            toast.promise(
              updateUserContext({ ...initialState, userUid: uid, userName })
              , {
                pending: "Logging ...",
                success: "Logged",
                error: "Access denied",
              })
          } else if (message) {
            console.log(message)
            toast(message, {
              type: "error",
            });
          }
        })
        .catch((err) => {
          toast(err, {
            autoClose: 2000,
            type: "error",
          });
          console.log(err.message);
        });
    }
  };

  /* form data */
  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newData = {
      ...userDataRef.current,
      [`${name}`]: value,
    };
    userDataRef.current = newData as LoginData;
    if (Object.values(userDataRef.current).length === 2) submitRef.current?.removeAttribute("disabled")
  };

  const Form = (): JSX.Element => {
    return (
      <div className={styles.containerLoginEmail}>
        <Header props={headerLogin} />
        <div className={styles.logo}>
          <img src={registerImg} alt="main-logo" />
        </div>
        {!login?.userUid && (
          <div className={`${styles.formContainer} ${globalStyles.glass}`}>
            <img src={profileImg} alt="user-logo" />
            <form onSubmit={handlerLogin}>
              <input
                onChange={handlerChange}
                type="text"
                name="email"
                placeholder="email"
              />
              <input
                onChange={handlerChange}
                type="password"
                name="password"
                placeholder="password"
              />
              <button ref={submitRef} type="submit" disabled>Log in</button>
            </form>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <ToastContainer position="bottom-center" />
      {login?.userUid ? (
        <ProtectedRoutes route="/profile" element={<Form />} validation={true} />
      ) : (
        <Form />
      )}
    </>
  );
};
export default LoginEmail;

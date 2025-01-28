import styles from "./register.module.css";
import globalStyles from "../../css/global.module.css";
import { FormEvent, useContext, useRef } from "react";
import Header, { headerRegister } from "../../components/header/Header";
import useRegisterUsers from "../../hooks/useRegisterUsers";
import { User } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

import profileImg from "../../assets/profile.png";
import registerImg from "../../assets/register.gif";
import { Context } from "../../context/Context";
import ProtectedRoutes from "../../routes/ProtectedRoutes";
import { LoginData } from "../../types";
import useRealTimeDB from "../../hooks/useRealTimeDB";

const Register = () => {
  const { createAcountWithEmail } = useRegisterUsers();
  const { writeUserData } = useRealTimeDB();

  const submitRef = useRef<HTMLButtonElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);

  const { login, setLogin } = useContext(Context);
  let id: NodeJS.Timeout;
  const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const formValidation = (form: LoginData) => {
    if (!EmailRegex.test(form.email) || form.password !== form.password2)
      if (errorMessageRef?.current) {
        errorMessageRef.current.innerHTML =
          "Please check your info and try again";
        clearInterval(id);
        id = setTimeout(() => {
          if (errorMessageRef?.current)
            errorMessageRef.current.innerHTML = "";
        }, 2000);
        return false
      }
    return true;
  };

  const dataFormRef = useRef<LoginData>({
    email: "",
    password: "",
    password2: ""
  });

  const handlerFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...dataFormRef.current, [e.target.name]: e.target.value };
    dataFormRef.current = data
    if (Object.values(dataFormRef.current).length === 3) submitRef.current?.removeAttribute("disabled")
  };

  interface resUserLog extends User {
    message: string;
  }
  const handlerRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = dataFormRef.current;
    // disable the submit button till the promise is resolved
    submitRef.current?.setAttribute("disabled", "true");
    if (formValidation(dataFormRef.current))
      toast.promise(
        createAcountWithEmail({ email, password })
          .then((res) => {
            if (res) {
              const { uid, email, message } = res as resUserLog;
              if (message) {
                // an error has occured
                toast.error(message);
                return new Error(message);
              } else if (uid && email) {
                // user registered successfully
                toast.success("Account created successfully", {
                  autoClose: 500,
                });
                const data = {
                  userUid: uid,
                  userName: email?.split("@")[0] || ""
                };
                writeUserData(data).then((res) => {
                  console.log(res, login, data)
                  if (res === "data writed")
                    setLogin && setLogin({ ...login, ...data });

                });
                dataFormRef.current = { email: "", password: "" };
                (e.target as HTMLFormElement).reset();

              }
            }
          })
          .catch((err) => {
            toast.error(err);
            console.log(err);
          }),
        {
          pending: "Creating account...",
          error: "We sorry, Something went wrong",
        }
      );
  };

  return (
    <div className={styles.registerContainer}>
      <Header props={headerRegister} />
      <ToastContainer position="bottom-center" autoClose={2000} />
      <ProtectedRoutes
        route="/profile"
        element={
          <>
            <div className={styles.logo}>
              <img src={registerImg} alt="user-logo" />
            </div>
            <div className={`${styles.formContainer} ${globalStyles.glass}`}>
              <img src={profileImg} alt="user-logo" />

              <form onSubmit={handlerRegister}>
                <input onChange={handlerFormValues} type="email" placeholder="Email" name="email" />
                <input onChange={handlerFormValues} type="password" placeholder="Password" name="password" />
                <input onChange={handlerFormValues} type="password" placeholder="Password" name="password2" />
                <span className={styles.error} ref={errorMessageRef}></span>
                <button ref={submitRef} type="submit" disabled>Register</button>
              </form>
            </div>
          </>
        }
        validation={login?.userUid || null}
      />
    </div>
  );
};
export default Register;

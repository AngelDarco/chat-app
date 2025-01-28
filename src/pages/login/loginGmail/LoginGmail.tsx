import styles from "./logingmail.module.css";
import globalStyles from "../../../css/global.module.css";
import Header, { headerLogin } from "../../../components/header/Header";
import { intContext } from "../../../types";
import { useEffect, useState } from "react";
import userContexUpdate from "../../../utils/useContextUpdate";
import Loading from "react-loading";
import { FcGoogle } from "react-icons/fc";
import useLoginUsers from "../../../hooks/useLoginUsers";
import ProtectedRoutes from "../../../routes/ProtectedRoutes";
import { ToastContainer, toast } from "react-toastify";
import loginImg from "../../../assets/login2.gif";

const LoginGmail = () => {
  const { userContextData, updateUserContext, initialState } =
    userContexUpdate();
  const [userData, setUserData] = useState<intContext>();

  const { loginWithGmail } = useLoginUsers();

  useEffect(() => {
    userContextData().then((res) => setUserData(res));
  }, [userData?.userUid]);

  const handlerLogin = () => {
    toast.promise(
      loginWithGmail()
        .then((res) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((res as never as any).message)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return toast.error((res as any).message);
          if (res) {
            const { displayName, photoURL, uid } = res.user;
            const userName = displayName?.split(" ")[0] || displayName;
            const lastName = displayName?.split(" ")[1] || "";
            if (uid)
              updateUserContext({
                ...initialState,
                photo: photoURL || "",
                userUid: uid,
                userName,
                lastName,
              }).then((res) => {
                (res as string) !== "data writed"
                  ? toast.error(res as string)
                  : toast.success("Login Successfully", { type: "success" });
              });
            toast.onChange((res) => {
              if (res.status === "removed")
                setUserData({ ...initialState, userUid: uid });
            });
          }
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err.message);
        }),
      {
        pending: "accessing ...",
      }
    );
  };

  return (
    <div className={styles.containerLoginGmail}>
      <Header props={headerLogin} />
      <ToastContainer position="bottom-center" autoClose={1000} />
      <div className={styles.logo}>
        <img src={loginImg} alt="main-logo" />
      </div>
      {!userData ? (
        <div className={globalStyles.loader}>
          <Loading type="cylon" color="green" />
        </div>
      ) : userData?.userUid ? (
        <ProtectedRoutes element={<></>} route="/profile" validation={true} />
      ) : (
        <div className={styles.ico}>
          <div>
            <FcGoogle />
            <h1>Sign In</h1>
            <span>to continue to the app</span>
          </div>
          <button onClick={handlerLogin}>Sign In</button>
        </div>
      )}
    </div>
  );
};
export default LoginGmail;

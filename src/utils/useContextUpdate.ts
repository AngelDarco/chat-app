import { useContext } from "react";
import { Context, initialState } from "../context/Context";
import { intContext } from "../types";
import useRealTimeDB from "../hooks/useRealTimeDB";
import useLoginUsers from "../hooks/useLoginUsers";
import { debounce } from "./debounce";

/** function to read, update o delete the user context data */
const userContexUpdate = () => {
  const { writeUserData, readUserData } = useRealTimeDB();
  const { logout } = useLoginUsers();

  const { userName, userUid, login, setLogin } = useContext(Context);

  /**	read the user data in the server if exist and return it */
  const userContextData = async (): Promise<intContext | undefined> => {
    async function reader() {
      if (userUid && setLogin)
        await readUserData(`profiles/${userUid}`, setLogin)
          .then((res) => {
            return res;
          })
          .catch((err) => console.log(err));
    }
    const debounceCaller = debounce(reader);
    debounceCaller();
    return { ...login, userName, userUid };
  };

  /**	 update the user context data, write it to the realtime database and return it the new data */
  const updateUserContext = async (
    data: intContext,
    type?: string
  ): Promise<string | intContext | undefined> => {
    await deleteUserContext();

    const { userName, userUid } = data;

    // set the user data in the local storage
    if (userName)
      globalThis.localStorage.setItem("chatDarcoUserName", userName);
    const uid = (userUid: string) =>
      globalThis.localStorage.setItem("chatDarcoUserUid", userUid);

    if (userUid && userName && login && setLogin) {
      //	read the the user profile, write a new profile oterwise
      await readUserData(`profiles/${userUid}`, () => {})
        .then((res) => {
          if (res && Object.keys(res).length) {
            uid(userUid);
            setLogin({ ...login, ...res });
            if (type === "update") return writeUserData(data);
            return res;
          }
          uid(userUid);
          setLogin({ ...login, ...data });
          return writeUserData(data);
        })
        .catch((err) => {
          console.log(err);
          throw new Error("Error reading user data");
        });
    } else if (userName && setLogin && login) {
      setLogin({ ...login, userName });
      return { ...login, userName };
    }
  };

  /**  delete the user session and context and return the initial state */
  const deleteUserContext = async () => {
    return await logout()
      .then((res) => {
        globalThis.localStorage.removeItem("chatDarcoUserName");
        globalThis.localStorage.removeItem("chatDarcoUserUid");
        setLogin && setLogin({ ...initialState, userName: "", userUid: "" });
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  return {
    userContextData,
    updateUserContext,
    deleteUserContext,
    initialState,
  };
};
export default userContexUpdate;

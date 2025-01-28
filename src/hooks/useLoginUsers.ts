import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/firebase-config";
import { LoginData } from "../types";

const auth = getAuth(app);

const useLoginUsers = () => {
  interface intData extends User {
    message?: string;
  }
  const loginWithEmail = async ({
    email,
    password,
  }: LoginData): Promise<intData> => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredentials.user;
    } catch (err) {
      return err as intData;
    }
  };

  const loginWithGmail = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return { loginWithEmail, loginWithGmail, logout };
};
export default useLoginUsers;

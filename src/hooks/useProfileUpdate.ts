import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import useRealTimeDB from "./useRealTimeDB";
import { app } from "../firebase/firebase-config";

const useProfileUpdate = () => {
  const { writeUserData, readUserData } = useRealTimeDB();

  const storageImgs = async (
    fileName: string,
    file: Blob | undefined
  ): Promise<string | undefined> => {
    if (!file) return;
    try {
      const storage = getStorage(app);
      const imagesRef = ref(storage, "profiles/" + fileName);
      await uploadBytes(imagesRef, file);
      const res = await getDownloadURL(ref(imagesRef));
      return res;
    } catch (error) {
      console.log(error);
      return error as string;
    }
  };
  return { storageImgs, writeUserData, readUserData };
};
export default useProfileUpdate;

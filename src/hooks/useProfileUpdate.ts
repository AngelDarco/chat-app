import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import useRealTimeDB from "./useRealTimeDB";

const useProfileUpdate = () => {
  const { writeUserData, readUserData } = useRealTimeDB();

  const storageImgs = async (
    fileName: string,
    file: Blob | undefined
  ): Promise<string | undefined> => {
    if (!file) return;
    try {
      const storage = getStorage();
      const imagesRef = ref(storage, "profiles/" + fileName);
      await uploadBytes(imagesRef, file);
      const res = await getDownloadURL(ref(imagesRef));
      return res;
    } catch (error) {
      return error as string;
    }
  };
  return { storageImgs, writeUserData, readUserData };
};
export default useProfileUpdate;

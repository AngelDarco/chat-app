import styles from "./profilecongif.module.css";
import globalStyles from "../../../css/global.module.css";
import Header, { headerUser } from "../../../components/header/Header";
import { useEffect, useRef, useState } from "react";
import useProfileUpdate from "../../../hooks/useProfileUpdate";
import { toast, ToastContainer } from "react-toastify";

import { intContext } from "../../../types";
import userContexUpdate from "../../../utils/useContextUpdate";
import Loading from "react-loading";

const ProfileConfig = (): JSX.Element => {
  const { userContextData, updateUserContext } = userContexUpdate();

  /* Storage images in the firebase server */
  const { storageImgs, readUserData } = useProfileUpdate();

  /* state to change image of profile viewer */
  const [img, setImg] = useState<string>();

  /* code to fill the dataref with user info */
  const dataRef = useRef<intContext>();

  const [profileData, setProfileData] = useState<intContext>();

  /* Reading server existing data and updating user profile data */
  useEffect(() => {
    userContextData()
      .then((res) => {
        if (res) setProfileData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  /* get user info  and change inputs data*/
  useEffect(() => {
    if (!profileData?.userUid) return;
    readUserData(`profiles/${profileData?.userUid}`, () => { })
      .then((res) => {
        const { userName, lastName, state, about, photo } = res as intContext;

        setProfileData({ ...profileData, ...res });

        /* change input values */
        if (nameRef.current) nameRef.current.value = userName || "";
        if (lastNameRef.current) lastNameRef.current.value = lastName || "";
        if (stateRef.current) stateRef.current.value = state || "";
        if (aboutRef.current) aboutRef.current.value = about || "";
        if (photo) photoRef.current?.setAttribute("src", photo || "");

        dataRef.current = { ...dataRef.current, ...res };
      })
      .catch((err) => console.log(err));
  }, [profileData?.userUid]);

  /* send data to the server */
  const handlerSendData = () => {
    if (!profileData?.userUid) return;
    /* write updated data */
    const writeData = async (data: intContext) => {
      await updateUserContext({ ...profileData, ...data }, "update")
        .then((res) => {
          if (res) toast("Error ..." + res, { type: "error" });
          else toast("Done ...", { type: "success" });
        })
        .catch((err) => console.log(err));
    };
    /* uploading new profile picture to the server*/
    if (dataRef.current?.file) {
      if (profileData?.userUid)
        toast.promise(
          storageImgs(profileData?.userUid, dataRef.current?.file).then(
            (res) => {
              if (!res?.includes("Error") && dataRef.current) {
                dataRef.current.photo = res;
                /* write updated data with picture */
                writeData(dataRef.current);
              } else {
                console.log(res);
                toast(res, {
                  type: "error",
                  autoClose: 2000,
                });
              }
            }
          ),
          {
            pending: "Accessing",
            error: "error in the matrix",
          }
        );
      /* write updated data without picture*/
    } else dataRef.current && writeData(dataRef.current);
  };

  /* fill the user data from inputs and change picture in the shower div */
  const handlerInputsData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    /* adding new data to the dataRef */
    const newDataRef = {
      ...dataRef.current,
      [name]: value,
    };
    dataRef.current = newDataRef as intContext;

    /* change image of container viewer */
    if (name === "file") {
      if (dataRef.current)
        dataRef.current.file = (e.target as HTMLInputElement).files?.[0];

      const file = dataRef.current?.file;
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        e.target?.result && setImg(e.target.result as string);
      });
      file && reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.containerProfileConfig}>
      <Header props={headerUser} />
      <ToastContainer position={"bottom-center"} autoClose={500} />
      {!profileData?.userUid ? (
        <div className={globalStyles.loader}>
          <Loading type="cylon" color="green" />
        </div>
      ) : (
        <div className={styles.sectionProfileConfig}>
          <div className={styles.userImage}>
            <img src={img} alt="user-picture" ref={photoRef} />
            <input onChange={handlerInputsData} type="file" name="file" />
          </div>
          <div className={styles.userData}>
            <div>
              <label htmlFor="userName">Name:</label>
              <input
                onChange={handlerInputsData}
                type="text"
                name="userName"
                ref={nameRef}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name:</label>
              <input
                onChange={handlerInputsData}
                type="text"
                name="lastName"
                ref={lastNameRef}
              />
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <input
                onChange={handlerInputsData}
                type="text"
                name="state"
                ref={stateRef}
              />
            </div>
            <div className={styles.about}>
              <label htmlFor="about">About You:</label>
              <textarea
                onChange={handlerInputsData}
                name="about"
                ref={aboutRef}
              />
            </div>
            <div className={styles.button}>
              <button onClick={handlerSendData}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileConfig;

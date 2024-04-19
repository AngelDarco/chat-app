import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  update,
  query,
  orderByChild,
  limitToLast,
  set,
} from "firebase/database";
import { intUpdateUserData, intContext, intAddFriend, intAddPersonalMessage, database } from "../types";
import { firebaseConfig as fbConfig } from "../firebase/firebase-config";

//  Firebase project configuration
const firebaseConfig = {
  ...fbConfig,
  databaseURL: "https://darco-corporation-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

const useRealTimeDB = () => {
  /**  function to read the user Data from the firebase server, must be type Object to return users profiles or type Array to return messages */

  async function readUserData<T>(userDB: database = "/public/"): Promise<T> {
    const obj: T = {} as T;
    const arr: T = [] as T;
    const data = <T>(res: T, resolve: (value: T) => void) => {
      const starCountRef = query(
        ref(db, userDB),
        orderByChild("messageSendTime"),
        limitToLast(150)
      );

      onValue(starCountRef, (snapshot) => {
        snapshot.forEach((element) => {
          if (Array.isArray(res)) {
            res.push(element.val());
          } else {
            res = {
              ...res,
              [element.key as string]: element.val(),
            };
          }
        });
        resolve(res);
      });
    };
    return new Promise<T>((resolve, reject) => {
      if (userDB === "/public/") {
        data(arr, resolve);
      } else if (typeof userDB === "string" && userDB !== "/public/") {
        data(obj, resolve);
      } else {
        reject(new Error("invalid database path"));
      }
    });
  }

  // function to write the user Data in the firebase server
  async function writeUserData(props: intContext): Promise<string | Error> {
    if (!props) return Promise.reject(new Error("no data found"));
    if (!props.userName || !props.userUid)
      return Promise.reject(
        new Error("userUid, userName, lastName are required")
      );
    try {
      const { userUid, photo, userName, lastName, state, about } = props;

      await set(ref(db, "profiles/" + userUid), {
        photo,
        userName,
        lastName,
        state,
        about,
        userUid,
      });
      return "data writed";
    } catch (error) {
      return error as Error;
    }
  }

  // function to update the user messages in the firebase server
  async function updateUserData(props: intUpdateUserData | intAddFriend){
    if (!props) return Promise.reject(new Error("no data found"));
    if (!(props as intUpdateUserData).userDB)
      return Promise.reject("userDB and messageId are required");

  // function to update the user messages in the firebase server
  interface updates {
    [key: string]: intAddFriend | intUpdateUserData | intAddPersonalMessage
  }
  const updates: updates = {};
  const publicMessages = (props: intUpdateUserData)=>{
      
    const {
      userName,
      message,
      messageSendTime,
      messageId,
      userDB = "/public/",
    } = props;

    return {
      [userDB + messageId] : {
        userName,
        message,
        messageSendTime,
      }
    };
  };

  //function to update the users friend list
  const addFriend = (props: intAddFriend)=>{
    const {
      userDB,
      userUid,
      friendUid,
    } = props;
    return {
      [userDB + userUid+"/" + friendUid] : {
        friendUid
      } 
    };
  };

  const addChats = (props: intAddPersonalMessage)=>{
    const {
      userDB,
      uidFrom,
      uidTo,
      userName,
      message,
      messageId,
      messageSendTime,
    } = props;
      // userDB: `chats/${uidFrom}/${uidTo}`,
    return {
      [ userDB + uidFrom + "/" + uidTo + "/" + messageId ] : {
        userName,
        message,
        messageSendTime,
      }
    };
  };

  // Write the new post's data simultaneously in the posts list and the userId's post list.

  let dataUpdate = {};
    
  if(props.userDB === "/public/" || props.userDB === "tests/") dataUpdate  = publicMessages(props as intUpdateUserData);
  else if (props.userDB === "chats/") dataUpdate = addChats(props as intAddPersonalMessage);
  else if (props.userDB === "friends/") dataUpdate = addFriend(props as intAddFriend);
  else return Promise.reject(new Error("invalid database path"));
    
  return new Promise((resolve, reject) => {
    update(ref(db), dataUpdate)
      .then(() => {
        return resolve("data updated");
      })
      .catch((err) => {
        return reject(err);
      });
  });
  }

  return { readUserData, writeUserData, updateUserData };
};
export default useRealTimeDB;

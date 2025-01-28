/* eslint-disable no-undef */
/* interface of Context provider */
export interface intContext {
  userName: string | null;
  userUid: string | null;
  lastName?: string;
  photo?: string;
  state?: string;
  about?: string;
  file?: Blob | undefined;
  login?: intContext;
  setLogin?: React.Dispatch<React.SetStateAction<intContext>>;
}

// interface of messages send
export interface message {
  userName: string;
  message: string;
  messageSendTime: number;
}

// interface to write in the realtime DB
export interface intWrite {
  userName: string | null;
  messageId: string;
  userDB: string | null;
  message: string | undefined;
  messageSendTime: number;
}

/* add and update new messages */
export interface intUpdateUserData {
  messageId: string;
  userName: string | null;
  message: string | null;
  userDB?: string | null;
  messageSendTime: number;
}

export interface intAddPersonalMessage extends intUpdateUserData {
  userDB: string;
  uidFrom: string;
  uidTo: string;
}

/* add friends list */
export interface intAddFriend {
  userDB: string;
  userUid: string;
  friendUid: string;
}

/* credentials login user  */
export interface LoginData {
  email: string;
  password: string;
  password2?: string;
}

// valid types to read the database
export type database =
  | "/public/"
  | `/public/${string}`
  | "profiles/"
  | `profiles/${string}`
  | `chats/${string}`
  | `chats/${string}/${string}`
  | `friends/${string}`
  | undefined;

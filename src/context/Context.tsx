import React, { useState } from "react";
import { intContext } from "../types";

const defaultValues: intContext = {
  userName: globalThis.localStorage.getItem("chatDarcoUserName"),
  userUid: globalThis.localStorage.getItem("chatDarcoUserUid"),
  lastName: "",
  state: "",
  about: "",
  photo: "https://firebasestorage.googleapis.com/v0/b/chat-app-b1911.appspot.com/o/profiles%2Fprofile.png?alt=media&token=7d909965-4cc1-4a53-aecb-61b551f0040d"
};

const Context = React.createContext(defaultValues);

const MainContext = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [login, setLogin] = useState<intContext>(defaultValues);

  const data: intContext = { ...login, login, setLogin };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export { MainContext, Context, defaultValues as initialState };

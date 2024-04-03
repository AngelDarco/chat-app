import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./pages/main/Main";
import { MainContext } from "./context/Context";

const App: React.FC = () => {
  return (
    <MainContext>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </MainContext>
  );
};

export default App;

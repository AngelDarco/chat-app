import logo from "../../assets/nolog.svg";
const MessageNoLogged = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        padding: "2rem",
        width: "100%",
        height: "100%",
      }}
    >
      <h1> You must be logged to access this page </h1>
      <img src={logo} alt="logo" style={{ width: "100%" }} />
    </div>
  );
};
export default MessageNoLogged;

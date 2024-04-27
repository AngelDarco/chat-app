import { useLocation } from "react-router-dom";
import Router from "../../routes/Router";
import Welcome from "../welcome/Welcome";

const Main = (): JSX.Element => {
  const location = useLocation();
  return <>{location.pathname === "/" ? <Welcome /> : <Router />}</>;
};

export default Main;

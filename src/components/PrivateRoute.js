import { LoginInfo } from "../global-objects/LoginInfo";
import Login from "../pages/Login";
import Settings from "../pages/Settings";

const PrivateRoute = (props) => {
  const authenticateUser = () => {
    if (LoginInfo.username === null) {
      return <Login />;
    }
    else {
      return <Settings />;
    }
  };
  return (
    authenticateUser()
  );
};

export default PrivateRoute;

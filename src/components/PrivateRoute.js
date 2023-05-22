import { LoginInfo } from "../global-objects/LoginInfo";
import Login from "../pages/Login";
import Settings from "../pages/Settings";

const PrivateRoute = (props) => {
  //Checks if the user is loggedin and if they aren't it goes to the Login page
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

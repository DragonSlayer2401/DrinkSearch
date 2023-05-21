import LoginCard from "../components/LoginCard";
import Header from "../components/Header";
import { LoginInfo } from "../global-objects/LoginInfo";

function Signup() {
  return (
    <div>
      <Header info={LoginInfo} />
      <LoginCard label="Signup" button="Submit"  />
    </div>
  );
}

export default Signup;

import Header from "../components/Header";
import LoginCard from "../components/LoginCard";
import { LoginInfo } from "../global-objects/LoginInfo";

function Login () {
    return(
        <div>
            <Header info={LoginInfo} />
            <LoginCard label="Login" button="Submit"/>
        </div>
    )
}

export default Login;
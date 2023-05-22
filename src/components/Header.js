import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Select } from "antd";
import { useEffect, useState } from "react";
import { LoginInfo } from "../global-objects/LoginInfo";
import { UserOutlined } from "@ant-design/icons";
import { hover } from "@testing-library/user-event/dist/hover";
import { click } from "@testing-library/user-event/dist/click";
import { triggerFocus } from "antd/es/input/Input";
const Header = () => {
  const [LoggedInTabIndex, setLoggedInTabIndex] = useState('-1');
  const [LoggedOutTabIndex, setLoggedOutTabIndex] = useState('1');
  const [LoginState, setLoginState] = useState({LoggedIn:false});
  const navigate = useNavigate();

  //Stores the links found in the dropdown menu
  const menuItems = [
    {
      key:'1', 
      label:<Link to="/settings">Settings</Link>
    },
    {
      key:'2', 
      label:<Link to="/welcome">Logout</Link>
    }
  ];

  //Handles logging out
  const logOut = () => {
    LoginInfo.username = null;
    LoginInfo.password = null;
    LoginInfo.favorites = [];
    setLoginState({LoggedIn:false});
  }

  //Handles what happens when the user clicks on a dropdown link
  const onClick = (key) => {
    if(key.key === '2') {
      logOut()
    }
  }

  useEffect(() => {
    if (LoginInfo.username !== null) {
      setLoginState({LoggedIn:true});
    }
  }, [navigate]);


 
  return (
    <header style={{background:"#E94F37"}} className="p-3 fixed w-full z-10 border-solid border-b sm:h-12">
      <nav className="flex justify-between gap-3 sm:flex-row">
        <div className="mx-auto flex gap-8 text-white flex-col text-center sm:flex-row">
          <Link to="/welcome" className="focus:underline underline-offset-4" tabIndex={1}>Welcome</Link>
          <Link to="/search" className="focus:underline underline-offset-4" tabIndex={1}>Search</Link>
          <Link to="/settings" className="focus:underline underline-offset-4" tabIndex={1}>Settings</Link>
        </div>
        <div className="flex gap-5 text-white flex-col sm:flex-row">
          <Link to="/login" tabIndex={LoginState.LoggedIn ? "-1" : "1"}>
            <Button size="small" className="text-white" style={{ background: "transparent", display: LoginState.LoggedIn ? "none" : "inline"}}>Login</Button>
          </Link>
          <Link to="/signup" tabIndex={LoginState.LoggedIn ? "-1" : "1"}>
            <Button size="small" className="text-white" style={{ background: "transparent", display: LoginState.LoggedIn ? "none" : "inline" }}>Signup</Button>
          </Link>
          <Dropdown menu={{items:menuItems, onClick}}>
            <div className="flex flex-row items-center gap-2">
              <Avatar size="default" icon={<UserOutlined />} style={{ display: LoginState.LoggedIn ? "inline" : "none" }}/>
              <p style={{ display: LoginState.LoggedIn ? "inline" : "none"  }}>{LoginInfo.username}</p>
            </div>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
};

export default Header;

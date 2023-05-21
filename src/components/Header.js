import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { LoginInfo } from "../global-objects/LoginInfo";
import { UserOutlined } from "@ant-design/icons";
const Header = () => {
  const [displayButtons, setDisplayButtons] = useState("inline");
  const [displayAccountInfo, setDisplayAccountInfo] = useState("none");
  const [LoggedInTabIndex, setLoggedInTabIndex] = useState('-1');
  const [LoggedOutTabIndex, setLoggedOutTabIndex] = useState('1')
  const navigate = useNavigate();

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

  const logOut = () => {
    LoginInfo.username = null;
    LoginInfo.password = null;
    LoginInfo.favorites = [];
    setDisplayAccountInfo("none");
    setDisplayButtons("inline")
  }

  const onClick = (key) => {
    if(key.key === '2') {
      logOut()
    }
  }

  const uppercaseUsername = (username) => {
    if (username !== null) {
      const arr = Array.from(username);
      arr[0] = arr[0].toUpperCase();
      username = "";
      arr.forEach((e) => (username += e));
      return username;
    }
  };

  useEffect(() => {
    if (LoginInfo.username !== null) {
      setDisplayAccountInfo("inline");
      setDisplayButtons("none");
      setLoggedInTabIndex("1");
      setLoggedOutTabIndex("-1");
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
          <Link to="/login" tabIndex={LoggedOutTabIndex}>
            <Button size="small" className="text-white" style={{ background: "transparent", display: displayButtons }}>Login</Button>
          </Link>
          <Link to="/signup" tabIndex={LoggedOutTabIndex}>
            <Button size="small" className="text-white" style={{ background: "transparent", display: displayButtons }}>Signup</Button>
          </Link>
          <Dropdown menu={{items:menuItems, onClick}} tabIndex={LoggedInTabIndex}>
            <div className="flex flex-row items-center gap-2">
              <Avatar size="default" icon={<UserOutlined />} style={{ display: displayAccountInfo }}/>
              <p style={{ display: displayAccountInfo }}>{uppercaseUsername(LoginInfo.username)}</p>
            </div>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
};

export default Header;

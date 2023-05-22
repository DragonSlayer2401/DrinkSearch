import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { LoginInfo } from "../global-objects/LoginInfo";
import axios from "axios";

const LoginCard = (props) => {
  const [usernameError, setUsernameError] = useState({message:"", display:"none"});
  const [userInfo, setUserInfo] = useState({username:"", password:""});
  const navigate = useNavigate();

  //Updates the username in the userInfo state
  const updateUsername = (value) => {
    setUsernameError({...usernameError, display:"none"});
    setUserInfo({...userInfo, username: value.target.value});
  };

  //Updates the password in the userInfo state
  const updatePassword = (value) => {
    setUserInfo({...userInfo, password: value.target.value});
  };

  //Upercases the first letter of the username
  const uppercaseUsername = (username) => {
    if (username !== null) {
      const arr = Array.from(username);
      arr[0] = arr[0].toUpperCase();
      username = "";
      arr.forEach((e) => (username += e));
      return username;
    }
  };

  //Handles both signing up and logging in
  const handleUser = () => {
    //Handles logging in
    if (props.label === "Login") {
      //Finds the user in the database
      axios
        .post("http://localhost:4000/users/find", {
          user: {
            username: userInfo.username,
            password: userInfo.password,
          },
        })
        .then((result) => {
          //Changes to the signup page if the user is not found
          if (result.data.userFound === false) {
            navigate("/signup");
          } 
          //Logs the user into their account
          else {
            LoginInfo.username = uppercaseUsername(userInfo.username);
            //Adds the user's favorited drinks
            axios.get(`http://localhost:4000/users/${LoginInfo.username}`).then((userInfo) => {
              LoginInfo.favorites = userInfo.data.favorites;
            });
            navigate("/");
          }
        });
    }
    //Handles signing up
    else {
      //Adds the user to the database
      axios
        .post("http://localhost:4000/users/add", {
          user: {
            username: userInfo.username,
            password: userInfo.password,
          },
        })
        .then((result) => {
          //Displays error if user already exists
          if (result.data.message === "user already exists") {
            setUsernameError({message:`Username ${userInfo.username} is already taken`, display:"block"});
          }
          //Changes to the login page after the user signs up
          else {
            alert("Account Created");
            navigate("/login");
          }
        });
    }
  };

  return (
    <article className="flex items-center justify-center h-screen">
      <Form className="flex flex-col" initialValues={{ rememberMe: false }} onFinish={() => handleUser()} >
        {/* Contains the Login and Signup heading (upper part of form) */}
        <h1 className="text-white mx-auto py-14 px-40 text-2xl w-96" style={{ background: "#5C415D", borderRadius:"0.375rem 0.375rem 0 0"}} tabIndex={1}>
          {props.label}
        </h1>
        {/* Bottom part of the form */}
        <section className="bg-white" style={{borderRadius:"0 0 0.375rem 0.375rem"}}>
          {/* Contains the login and signup links inside of the form */}
          <div className="flex gap-3 justify-start w-10/12 mx-auto my-3 py-3 pr-0" style={{ background: "#F0F2F5" }}>
            <Link to="/login" className="text-black focus:underline underline-offset-4">Login</Link>
            <Link to="/signup" className="text-black focus:underline underline-offset-4">Signup</Link>
          </div>
          {/* Contains the form inputs and buttons/checkboxes */}
          <div className="flex flex-col mx-auto w-10/12">
            <p style={{ display: usernameError.display, color: "#ff4d4f" }}>{usernameError.message}</p>
            <Form.Item name="username" rules={[{ required: true, message: "Please input a username" }]}>
              <Input prefix={<UserOutlined />} placeholder="username" size="large" onChange={(event) => updateUsername(event)}/>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input a password" }]}>
              <Input prefix={<LockOutlined />} placeholder="password" size="large" type="password" onChange={(value) => updatePassword(value)}/>
            </Form.Item>
            <Form.Item name="rememberMe" valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Remember Me</Checkbox>
                <Button htmlType="submit" type="primary" className="w-1/4">{props.button}</Button>
              </div>
            </Form.Item>
          </div>
        </section>
      </Form>
    </article>
  );
};

export default LoginCard;

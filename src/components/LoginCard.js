import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { LoginInfo } from "../global-objects/LoginInfo";
import axios from "axios";

const LoginCard = (props) => {
  const [usernameMessage, setUsernameMessage] = useState("Please input a username");
  const [usernameError, setUsernameError] = useState("none");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const updateUsername = (value) => {
    setUsernameError("none");
    setUsername(value.target.value);
  };

  const updatePassword = (value) => {
    setPassword(value.target.value);
  };

  const handleUser = () => {
    if (props.label === "Login") {
      axios
        .post("http://localhost:4000/users/find", {
          user: {
            username: username,
            password: password,
          },
        })
        .then((result) => {
          if (result.data.userFound === false) {
            navigate("/signup");
          } else {
            LoginInfo.username = result.data.result.user.username;
            axios.get(`http://localhost:4000/users/${LoginInfo.username}`).then((userInfo) => {
              LoginInfo.favorites = userInfo.data.favorites;
            });
            navigate("/");
          }
        });
    }
    else {
      axios
        .post("http://localhost:4000/users/add", {
          user: {
            username: username,
            password: password,
          },
        })
        .then((result) => {
          if (result.data.message === "user already exists") {
            setUsernameError("block");
            setUsernameMessage(`Username ${username} is already taken`);
          }
          else {
            alert("Account Created");
            navigate("/login");
          }
        });
    }
  };

  return (
    <article className="flex items-center justify-center h-screen">
      <Form className="flex flex-col" initialValues={{ rememberMe: false, usernameMessage }} onFinish={() => handleUser()} >
        <h1 className="text-white mx-auto py-14 px-40 text-2xl w-96" style={{ background: "#5C415D", borderRadius:"0.375rem 0.375rem 0 0"}} tabIndex={1}>
          {props.label}
        </h1>
        <section className="bg-white" style={{borderRadius:"0 0 0.375rem 0.375rem"}}>  
          <div className="flex gap-3 justify-start w-10/12 mx-auto my-3 py-3 pr-0" style={{ background: "#F0F2F5" }}>
            <Link to="/login" className="text-black focus:underline underline-offset-4">Login</Link>
            <Link to="/signup" className="text-black focus:underline underline-offset-4">Signup</Link>
          </div>
          <div className="flex flex-col mx-auto w-10/12">
            <p style={{ display: usernameError, color: "#ff4d4f" }}>{usernameMessage}</p>
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

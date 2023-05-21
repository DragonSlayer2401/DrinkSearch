import { Form, Input, Avatar, Button} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginInfo } from "../global-objects/LoginInfo";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UserProfile = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayError, setDisplayError] = useState("none");
  const [form] = Form.useForm();

  const handlePassword = (value) => {
    setPassword(value.target.value);
    setDisplayError("none");
  }

  const handleConfirmPassword =  (value) => {
    setConfirmPassword(value.target.value);
    setDisplayError("none");
  }

  const handlePasswordSubmit = () => {
    form.resetFields();
    if(password === confirmPassword){
        axios.patch("http://localhost:4000/users/password", {
            user:{
                username: LoginInfo.username,
                password: password,
            },
            favorites: LoginInfo.favorites
        }).then(result => {
          alert("Password Change Successful");
        })
    }
    else{
        setErrorMessage("Password Does Not Match!")
        setDisplayError("block")
    }
  }

  const addLinks = () => {
    if (LoginInfo.favorites !== null) {
      if (LoginInfo.favorites.length > 0) {
       return LoginInfo.favorites.map((drink, index) => {
            return <Link to="/details" state={drink.drinkData} className="block text-white text-lg underline underline-offset-2" key={index} tabIndex={1}>
              {drink.drinkData.name}
            </Link>
        });
      }
    }
  };
  return (
    <article>
      <section style={styles.sections} className="p-10 rounded-md">
        <Form className="flex flex-col gap-5" form={form} onFinish={() => handlePasswordSubmit()}>
          <Avatar size={150} icon={<UserOutlined />} className="mx-auto block"/>
          <h2 className="text-white mx-auto text-2xl" tabIndex={1}>{props.name}</h2>
          <section className="flex  flex-col gap-2 justify-center items-center">
            <div className="mx-auto w-full sm:w-5/12">
              <label className="text-white" tabIndex={1}>Change Password</label>
              <Form.Item name="password" rules={[{ required: true, message: "Please input a password" }]} tabIndex={-1}>
                <Input prefix={<LockOutlined />} placeholder="password" size="large" onChange={(value) => handlePassword(value)} tabIndex={1}/>
              </Form.Item>
            </div>
            <Form.Item name="confirm-password" rules={[{ required: true, message: "Please input a password" }]} className="w-full sm:w-5/12" tabIndex={-1}>
              <Input prefix={<LockOutlined />} placeholder="confirm password" size="large" onChange={(value) => handleConfirmPassword(value)} tabIndex={1}/>
            </Form.Item>
            <p className="text-xl bg-black text-white p-3" style={{display:displayError}} tabIndex={1}>{errorMessage}</p>
            <Button type="primary" htmlType="submit" className="w-2/6 sm:w-1/6 lg:w-1/12" style={{ background: "#1750FF" }} tabIndex={1}>Submit</Button>
          </section>
        </Form>
      </section>
      <section style={styles.sections} className="mt-5 p-10 rounded-md">
        <h3 className="text-white text-2xl" tabIndex={1}>Favorite Drinks</h3>
        {addLinks()}
      </section>
    </article>
  );
};

export default UserProfile;

const styles = {
  sections:{
    background: "#5C415D"
  }
}

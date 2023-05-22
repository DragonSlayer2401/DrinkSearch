import { Form, Input, Avatar, Button} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginInfo } from "../global-objects/LoginInfo";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UserProfile = (props) => {
  const [passwords, setPasswords] = useState({password:"", confirmPassword:""});
  const [errorState, setErrorState] = useState({error:"", display:"none"});
  const [form] = Form.useForm();

  //updates the password property of the passwords state
  const handlePassword = (value) => {
    setPasswords({...passwords, password:value.target.value});
    setErrorState({...errorState, display:"none"});
  }

  //updates the confirmPassword property of the passwords state
  const handleConfirmPassword =  (value) => {
    setPasswords({...passwords, confirmPassword:value.target.value});
    setErrorState({...errorState, display:"none"});
  }

  const handlePasswordSubmit = () => {
    form.resetFields();
    //Updates the user's password in the database if the two inputted passwords match
    if(passwords.password === passwords.confirmPassword){
        axios.patch("http://localhost:4000/users/password", {
            user:{
                username: LoginInfo.username,
                password: passwords.password,
            },
            favorites: LoginInfo.favorites
        }).then(result => {
          alert("Password Change Successful");
        })
    }
    else{
      setErrorState({error:"Password Does Not Match!", display:"block"});
    }
  }

  //Creates and adds the links to the favorited drinks to the Favorite Drinks section
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
      {/* Password change and username section */}
      <section style={styles.sections} className="p-10 rounded-md">
        <div className="flex flex-col gap-2">
          {/* Ant Design Avatar component */}
          <Avatar size={150} icon={<UserOutlined />} className="mx-auto block"/>
          {/* Contains the user's username */}
          <h2 className="text-white mx-auto text-2xl mb-5" tabIndex={1}>{props.name}</h2>
        </div>
        {/* Password change form */}
        <Form className="flex flex-col gap-2 justify-center items-center" form={form} onFinish={() => handlePasswordSubmit()}>
          <div className="mx-auto w-full sm:w-5/12">
            <label className="text-white" tabIndex={1}>Change Password</label>
            <Form.Item name="password" rules={[{ required: true, message: "Please input a password" }]} tabIndex={-1}>
              <Input prefix={<LockOutlined />} placeholder="password" size="large" onChange={(value) => handlePassword(value)} tabIndex={1}/>
            </Form.Item>
          </div>
          <Form.Item name="confirm-password" rules={[{ required: true, message: "Please input a password" }]} className="w-full sm:w-5/12" tabIndex={-1}>
            <Input prefix={<LockOutlined />} placeholder="confirm password" size="large" onChange={(value) => handleConfirmPassword(value)} tabIndex={1}/>
          </Form.Item>
          <p className="text-xl bg-black text-white p-3" style={{display:errorState.display}} tabIndex={1}>{errorState.error}</p>
          <Button type="primary" htmlType="submit" className="w-2/6 sm:w-1/6 lg:w-1/12" tabIndex={1}>Submit</Button>
        </Form>
      </section>
      {/* Favorite Drinks section */}
      <section style={styles.sections} className="mt-5 p-10 rounded-md">
        <h2 className="text-white text-2xl" tabIndex={1}>Favorite Drinks</h2>
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

import UserProfile from "../components/UserProfile";
import Header from "../components/Header";
import { LoginInfo } from "../global-objects/LoginInfo";

function Settings() {
  const uppercaseUsername = (username) => {
    if (username !== null) {
      const arr = Array.from(username);
      arr[0] = arr[0].toUpperCase();
      username = "";
      arr.forEach((e) => (username += e));
      return username;
    }
  };

  return (
    <main className="">
      <Header info={LoginInfo} />
      <div className="pt-40 sm:pt-12 mx-5">
        <h1 className="text-white text-3xl my-5 p-5 text-center sm:text-left rounded-md" style={{ background: "#5C415D" }} tabIndex={1}>User Profile</h1>
        <UserProfile name={uppercaseUsername(LoginInfo.username)} />
      </div>
    </main>
  );
}

export default Settings;

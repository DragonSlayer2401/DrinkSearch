import Cards from "../components/Cards";
import Header from "../components/Header";
import { LoginInfo } from "../global-objects/LoginInfo";

function Welcome() {
  return (
    <main>
      <Header info={LoginInfo} />
      <div className="pt-40 sm:pt-12 mx-5">
        <h1 style={{ background: "#5C415D" }} className="text-white my-5 p-5 text-3xl text-center sm:text-left rounded-md" tabIndex={1}> Welcome To Drink Search </h1>
        <Cards
          text="This website was designed to make it easier to find recipes for the drinks you love. We offer the ability to not only find drinks but also to favorite drinks. This is a 5 page website the pages are the welcome page, search page, settings page, login page, and sign up page. The welcome page provides an overview of the entire website. The search page contains the search bar used to search for drinks. The settings page contains your profile settings and your favorite drinks. The login page allows you to login to your account and the sign up page allows you to create an account. To summarize our website offers the following benefits:"
          list={[
            "Easy drink recipe searching",
            "Favoriting drinks",
          ]}
        />
      </div>
    </main>
  );
}

export default Welcome;

import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { LoginInfo } from "../global-objects/LoginInfo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DetailsGrid = (props) => {
  const [displayState1, setDisplay1] = useState("inline");
  const [displayState2, setDisplay2] = useState("none");
  const navigate = useNavigate();

  useEffect(() => {
    if (LoginInfo.favorites !== null) {
      if (LoginInfo.favorites.length > 0) {
        for (let i = 0; i < LoginInfo.favorites.length; i++) {
          if (LoginInfo.favorites[i].drinkData.name === props.name) {
            setDisplay2("inline");
            setDisplay1("none");
          }
        }
      }
    }
    else {
      setDisplay1("inline");
    }
  }, [props.name]);

  const clickHandler = (measurements, ingredients) => {
    //Switches to Login page if the user is not loggedin
    if(LoginInfo.username === null) {
      navigate("/login");
      //Stops console errors
      return;
    }
    
    //Adds the drink as a favorite
    if (displayState1 === "inline") {
      setDisplay1("none");
      setDisplay2("inline");
      axios
        .post("http://localhost:4000/favorites/add", {
          user: LoginInfo.username,
          drinkData: {
            name: props.name,
            image: props.image,
            ingredients: props.ingredients,
            instructions: props.instructions,
          },
        })
        .then((result) => {
          axios
            .get(`http://localhost:4000/favorites/${LoginInfo.username}`)
            .then((result) => {
              const ids = result.data.ids;
              axios
                .patch("http://localhost:4000/users/drinks", {
                  user: {
                    username: LoginInfo.username,
                    password: LoginInfo.password,
                    ids,
                  },
                })
                .then((result) => {
                  axios
                    .get(`http://localhost:4000/users/${LoginInfo.username}`)
                    .then((userInfo) => {
                      LoginInfo.favorites = userInfo.data.favorites;
                    });
                });
            });
        });
    }
    //Removes the drink as a favorite
    else {
      setDisplay1("inline");
      setDisplay2("none");
      let id = 0;
      for (let i = 0; i < LoginInfo.favorites.length; i++) {
        if (LoginInfo.favorites[i].drinkData.name === props.name) {
          id = LoginInfo.favorites[i]._id;
          break;
        }
      }
      axios
        .delete(`http://localhost:4000/favorites/delete/${id}`)
        .then((result) => {
          axios
            .get(`http://localhost:4000/users/${LoginInfo.username}`)
            .then((userInfo) => {
              LoginInfo.favorites = userInfo.data.favorites;
            });
        });
    }
  };

  const createList = (ingredients) => {
    return ingredients.map((element, index) => <li key={index} className="list-disc mb-2 text-lg" tabIndex={1}>{`${element}`}</li>)
  };

  //Turns the string of instructions into a list of items
  const formatter = (instructions) => {
    let array = instructions.split('.');
    //Fixes messed up ()
    for (let i = 0; i < array.length; i++) {
      if(array[i] === '(' || ')') {
        const temp = array[i]
        if(temp === '(') {
          array[i+1] = temp.concat(array[i+1]);
          array.splice(i,1)
        }
        else if(temp === ')') {
          array[i-1] = array[i-1].concat(temp);
          array.splice(i,1)
        }
      }
    }
    //Fixes the issue where there is sometimes an empty string at the end of the instructions array
    if(array[array.length-1] === ''){
      array.pop()
    }

    return array.map((element, index) => <li key={index} className="list-decimal mt-2 text-lg ml-20" tabIndex={1}>{`${element}.`}</li>)
  };

  return (
    <article className="grid mt-10 grid-cols-1 gap-4 mx-auto sm:w-11/12 sm:grid-cols-2 xl:w-1/2">
      <img src={props.image} alt={props.name} className="w-full col-span-2 lg:h-full sm:col-span-1 rounded-md" tabIndex={1}/>
      <div className="flex flex-col text-white col-span-2 sm:col-span-1">
        <section style={styles.cards} className="mb-3 flex items-center justify-center rounded-md">
          <HeartOutlined style={{width: "19.28px", color: "red", cursor: "pointer", display: displayState1,}}onClick={() => clickHandler(props.measurements, props.ingredients)} aria-label="favorite toggled off" tabIndex={1}/>
          <HeartFilled style={{width: "19.28px", color: "red", cursor: "pointer", display: displayState2,}} onClick={() => clickHandler()} aria-label="favorite toggled on" tabIndex={1}/>
          <h1 className="text-3xl p-3 text-center" tabIndex={1}>{props.name}</h1>
        </section>
        <section style={styles.cards} className="h-full w-full rounded-md">
          <h2 className="mb-0 text-2xl p-3 mx-auto" style={{ width: "69%" }} tabIndex={1}>Ingredients</h2>
          <ul className="mx-auto w-1/2">{createList(props.ingredients)}</ul>
        </section>
      </div>
      <section className="col-span-2 mb-3 p-5 text-left text-white rounded-md" style={styles.cards}>
        <h2 className="text-2xl text-center" tabIndex={1}>Instructions</h2>
        <ol>{formatter(props.instructions)}</ol>
      </section>
    </article>
  );
};

export default DetailsGrid;

const styles = {
  cards:{
    background: "#5C415D"
  }
}

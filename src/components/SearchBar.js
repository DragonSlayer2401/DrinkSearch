import { Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Stores what the user has inputted into the search bar
  const updateInput = (event) => {
    setInput(event.target.value);
  };

   //Extracts the ingredients out of response object
  const ingredientsHandler = (object) => {
    //Stores only the needed object keys
    const keys = Object.keys(object).splice(17, 15);
    const ingredientsArray = [];
    for(let i = 0; i < keys.length; i++) {
      //Adds the extracted ingredients to the ingredients Array and breaks when it encounters a null
      if(object[keys[i]] !== null) {
        ingredientsArray.push(object[keys[i]]);
      }
      else {
        break;
      }
    }
    return ingredientsArray;
  };

  //Extracts the measurements out of response object
  const measurementsHandler = (object) => {
    //Stores only the needed object keys
    const keys = Object.keys(object).splice(32, 15);
    const measurementsArray = [];
    for(let i = 0; i < keys.length; i++) {
      //Adds the extracted measurements to the measurements Array and breaks when it encounters a null
      if(object[keys[i]] !== null) {
        measurementsArray.push(object[keys[i]]);
      }
      else {
        break;
      }
    }
    return measurementsArray;
  };

  //Calls and handles the cocktail API
  const searchHandler = (event) => {
    if (input.length > 0) {
      const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
      axios.get(apiURL).then((result) => {
        //Checks if there are no results from the API
        if (result.data.drinks === null) {
          //Sets the error message that is displayed under the search bar
          setError(<p className="text-white bg-black p-3 text-lg" tabIndex={1}>Please enter a valid name!</p>);
        }
        else {
          //Passes the first drink result in the API to both the measurements and ingredients handlers
          const measurements = measurementsHandler(result.data.drinks[0]);
          const ingredients = ingredientsHandler(result.data.drinks[0]);
          const ingredientsMeasurements = [];

          //Combines the measurements with the ingredients
          for (let i = 0; i < ingredients.length; i++) {
            if (measurements[i] !== undefined) {
              ingredientsMeasurements.push(`${measurements[i]} ${ingredients[i]}`);
            } 
            else {
              ingredientsMeasurements.push(ingredients[i]);
            }
          }
          //Switches to the Details page and passes the data retrieved from the API
          navigate("/details", {
            state: {
              name: result.data.drinks[0].strDrink,
              image: result.data.drinks[0].strDrinkThumb,
              ingredients: ingredientsMeasurements,
              instructions: result.data.drinks[0].strInstructions,
              apiURL,
            },
          });
        }
      });
    }
    else {
      //Sets the error message if nothing is inputted
      setError(<p className="text-white bg-black p-3 text-lg" tabIndex={1}>Please enter a valid name!</p>);
    }
  };
  return (
    <article className="w-full flex flex-col items-center">
      {/* Ant Design search bar component */}
      <Search
        placeholder="input drink name"
        className="w-11/12 mx-auto sm:w-10/12 md:w-3/5 lg:w-1/2 2xl:w-2/5"
        enterButton
        onChange={(value) => updateInput(value)}
        onSearch={(value) => searchHandler(value)}
        size="large"
        tabIndex={1}
      />
      {error}
    </article>
  );
};

export default SearchBar;

import { Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateInput = (event) => {
    setInput(event.target.value);
  };

  const ingredientsHandler = (object) => {
    const keys = Object.keys(object).splice(17, 15);
    const ingredientsArray = [];
    for(let i = 0; i < keys.length; i++) {
      if(object[keys[i]] !== null) {
        ingredientsArray.push(object[keys[i]]);
      }
      else {
        break;
      }
    }
    return ingredientsArray;
  };

  const measurementsHandler = (object) => {
    const keys = Object.keys(object).splice(32, 15);
    const measurementsArray = [];
    for(let i = 0; i < keys.length; i++) {
      if(object[keys[i]] !== null) {
        measurementsArray.push(object[keys[i]]);
      }
      else {
        break;
      }
    }
    return measurementsArray;
  };

  const searchHandler = () => {
    if (input.length > 0) {
      const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
      axios.get(apiURL).then((result) => {
        if (result.data.drinks === null) {
          setError(<p className="text-white bg-black p-3 text-lg" tabIndex={1}>Please enter a valid name!</p>);
        }
        else {
          setError(null);
          const measurements = measurementsHandler(result.data.drinks[0]);
          const ingredients = ingredientsHandler(result.data.drinks[0]);
          const ingredientsMeasurements = [];

          for (let i = 0; i < ingredients.length; i++) {
            if (measurements[i] !== undefined) {
              ingredientsMeasurements.push(`${measurements[i]} ${ingredients[i]}`);
            } 
            else {
              ingredientsMeasurements.push(ingredients[i]);
            }
          }

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
      setError(<p className="text-white bg-black p-3 text-lg" tabIndex={1}>Please enter a valid name!</p>);
    }
  };
  return (
    <article className="w-full flex flex-col items-center">
      <Search
        placeholder="input drink name"
        className="w-11/12 mx-auto sm:w-10/12 md:w-3/5 lg:w-1/2 2xl:w-2/5"
        enterButton
        onChange={(value) => updateInput(value)}
        onSearch={() => searchHandler()}
        size="large"
        tabIndex={1}
      />
      {error}
    </article>
  );
};

export default SearchBar;

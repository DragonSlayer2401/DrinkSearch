import { useLocation } from "react-router-dom";
import DetailsGrid from "../components/DetailsGrid";
import Header from "../components/Header";
import { LoginInfo } from "../global-objects/LoginInfo";

function Details() {
  const data = useLocation();
  return (
    <main>
      <Header info={LoginInfo} />
      <div className="pt-32 sm:pt-12">
        <DetailsGrid
          image={data.state.image}
          name={data.state.name}
          measurements={data.state.measurements}
          ingredients={data.state.ingredients}
          instructions={data.state.instructions}
          url={data.state.apiURL}
        />
      </div>
    </main>
  );
}
export default Details;

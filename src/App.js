import { Route, Routes} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Details from "./pages/Details";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <div>
      <section>
          <Routes>
            <Route path="" element={<Welcome />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="search" element={<Search />} />
            <Route path="settings" element={<PrivateRoute />} />
            <Route path="details" element={<Details />} />
          </Routes>
      </section>
    </div>
  );
}

export default App;

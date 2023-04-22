import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Navbar from "./Pages/Navbar";
import { useCookies } from "react-cookie";
import Edituser from "./Pages/Edituser";
import Userpage from "./Pages/Userpage";
import AddUser from "./Pages/AddUser";


function App() {
  const [cookie, setCookie] = useCookies(["access_token"]);

  return (
    <div className="App">
      <BrowserRouter>
        {cookie.access_token ? <Navbar /> : null}
        <Routes>
          <Route exat path="/" element={<Home />} />
          <Route exat path="/userpage" element={<Userpage />} />
          <Route exat path="/adduser" element={<AddUser />} />
          <Route exat path="/editUser/:id" element={<Edituser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

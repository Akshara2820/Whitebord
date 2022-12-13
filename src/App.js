import logo from "./logo.svg";
import "./App.css";
import DrawAnnotations from "./component/drawcircle";
import SignUp from "./component/signup";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import DashBoard from "./component/dashbord";
import Login from "./component/login";
import Layout from "./component";

function App() {
  
const [user, setUser] = useState("");
const [active, setActive] = useState()

  useEffect(() => {
    const auth = localStorage.getItem("userRegister");
    const user = !!auth ? JSON.parse(auth) : undefined;
    setUser(user);
  }, []);
  return (
    // <div className="App">
    //   <Routes>
    //     <Route path="/" element={<SignUp />} />
    //     <Route path="/dashbord" element={<DashBoard />} />
    //     <Route path= '/login' element={<Login/>} />
   
    //   </Routes>
    // </div>
  <>
    <div className="">
   
   
      <Routes>
        {user ? (
          <Route path="/dashbord" element={<DashBoard />} />
        ) : (
          <Route exact path="/login" element={<Login />} />
        )}
        <Route path="/" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
   
  </>
);
}

export default App;

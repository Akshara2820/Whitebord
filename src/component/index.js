// import SignUp from "./signup";
// import { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Routes,
// } from "react-router-dom";
// import DashBoard from "./dashbord";
// import Login from "./login";

// function Layout() {
//   const [user, setUser] = useState("");
//   const [active, setActive] = useState(0);

//   useEffect(() => {
//     const auth = localStorage.getItem("userRegister");
//     const user = !!auth ? JSON.parse(auth) : undefined;
//     setUser(user);
//   }, []);
//   return (
//     <div>
//       <button onClick={() => setActive(1)}>SignUp</button>
//       <button onClick={() => setActive(0)}>Login</button>
//       <Routes>
//         {user ? (
//           <Route path="/dashbord" element={<DashBoard />} />
//         ) : (
//           <>
//             {active === 1 ? (
//               <Route path="/" element={<SignUp />} />
//             ) : (
//               <Route exact path="/" element={<Login />} />
//             )}
//           </>
//         )}
//       </Routes>
//     </div>
//   );
// }

// export default Layout;

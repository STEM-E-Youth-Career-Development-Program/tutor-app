import React from "react";
//import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import NavBar from "./components/Navbar"
import Dashboard from "./pages/Dashboard.js"
import NoPage from "./pages/NoPage.js"
import Login from "./pages/Login.js"
/*
import Home from "./pages";
import About from "./pages/Dashboard.js";
import Blogs from "./pages/Login.js";
import SignUp from "./pages/Matching.js
import Contact from "./pages/contact";
 */
function App() {
  return <>
      <Router>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
      </Router>
    </>;
}
/*
<Route exact path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route
    path="/contact"
    element={<Contact />}
/>
<Route path="/blogs" element={<Blogs />} />
<Route
    path="/sign-up"
    element={<SignUp />}
/>
*/

export default App;

import React, { useEffect, useState } from "react";
//import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import NavBar from "./components/Navbar"
import Dashboard from "./pages/Dashboard.js"
import NoPage from "./pages/NoPage.js"
import Login from "./pages/Login.js"
import ViewStudents from "./pages/ViewStudents.js"
import ViewStudentInfo from "./pages/ViewStudentInfo.js"
import ViewTutors from "./pages/ViewTutors.js"
import ViewTutorInfo from "./pages/ViewTutorInfo.js"/*
import Home from "./pages";
import About from "./pages/Dashboard.js";
import Blogs from "./pages/Login.js";
import SignUp from "./pages/Matching.js
import Contact from "./pages/contact";
 */
import { ViewTutorInfo } from "./pages/ViewTutorInfo.js";
function App() {
    const [ user, setUser ] = useState([]);

    const loginElement = <Login user={user} setUser={setUser} />

    return <>
      <Router>
            { user && <NavBar user={user} setUser={setUser} /> }
            <Routes>
                <Route path="/"  element={loginElement} />
                <Route path="/login" element={loginElement} />
                {
                    !user ? <>
                        <Route path="*" element={<Navigate to="/login" />} />
                    </> : <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/view-students" element={<ViewStudents />} />
                        <Route path="/view-tutors" element={<ViewTutors />} />
                        <Route path="*" element={<NoPage />} />
                        <Route path="/view-student-info" element={<ViewStudentInfo/>} />
                        <Route path="/view-tutor-info" element={<ViewTutorInfo/>} />
                    </>
                }
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

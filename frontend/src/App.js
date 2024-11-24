import { Route, Routes, useLocation } from "react-router-dom";
import Footer from './component/Footer'
import Home from './component/Home'
import Navbar from './component/Navbar'
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Creators from './pages/Creators';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useContext } from "react";
import { Authcontext } from "./context/Authcontext";
const App=()=> {

  const location=useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  const {blogs,profile}=useContext(Authcontext)
  console.log(profile)
  console.log(blogs)
  return (
    <div className="App">
    {!hideNavbarFooter && <Navbar/>}

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route exact path="/blogs" element={<Blogs />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/creators" element={<Creators />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>

    {!hideNavbarFooter && <Footer/>}
    </div>
  );
}

export default App;

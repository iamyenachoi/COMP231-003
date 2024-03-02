import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";
import RestaurantDetail from "../pages/Restaurants/RestaurantDetail";
import RestaurantList from "../pages/Restaurants/RestaurantList";
import ProtectedRoute from "../components/ProtectedRoutes.jsx";

import { Routes, Route } from "react-router-dom";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/RestaurantDetail" element={<RestaurantDetail />} />
      <Route path="/RestaurantList" element={<RestaurantList />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/Admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default Routers;

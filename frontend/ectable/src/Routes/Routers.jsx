import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import restaurantDetail from '../pages/Restaurants/restaurantDetail';
import restaurantList from '../pages/Restaurants/restaurantList';

import { Routes, Route } from 'react-router-dom';
const Routers = () => {
    return <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/Services" element={<Services/>} />
    <Route path="/Login" element={<Login/>} />
    <Route path="/Signup" element={<Signup/>} />
    <Route path="/Contact" element={<Contact/>} />
    <Route path="/restaurantDetail" element={<restaurantDetail/>} />
    <Route path="/restaurantList" element={<restaurantList/>} />
    </Routes>
};

export default Routers;
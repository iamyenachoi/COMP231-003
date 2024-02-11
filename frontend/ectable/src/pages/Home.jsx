import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
const Home = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px]">
        <div className="py-[30px] px-5">
          <div className="flex items-center justify-center">
            <img src={icon01} alt="" width="60" height="60" />
          </div>

          <div className="mt-[30px]">
            <h2 className="text-[26px] leading-9 text-headingColor font-[700 text center]">
              Book Table in ECTable
            </h2>

            <p className="text-[16px] leading-7 text-text-Color font-[400] text-center mt-4">
              The best place to find the best restaurants in town
            </p>

            <Link
              to="Restaurants/RestaurantList"
              className="w-[44px] h-[44px] rounded-full border border-solid mt-auto flex items-center justify-center  bg-primary-Color hover:bg-primaryColor hover:border-none"
            >
              <BsArrowRight className="group-hover:text-white w-6 h-5" />
            </Link>
          </div>
        </div>

        <div className="py-[30px] px-5">
          <div className="flex items-center justify-center">
            <img src={icon02} alt="" width="60" height="60" />
          </div>

          <div className="mt-[30px]">
            <h2 className="text-[26px] leading-9 text-headingColor font-[700 text center]">
              See Comments for Restaurants
            </h2>

            <p className="text-[16px] leading-7 text-text-Color font-[400] text-center mt-4">
              See Comments for over 100 Restaurants in town
            </p>

            <Link
              to="Restaurants/RestaurantList"
              className="w-[44px] h-[44px] rounded-full border border-solid mt-auto flex items-center justify-center  bg-primary-Color hover:bg-primaryColor hover:border-none"
            >
              <BsArrowRight className="group-hover:text-white w-6 h-5" />
            </Link>
          </div>
        </div>

        <div className="py-[30px] px-5">
          <div className="flex items-center justify-center">
            <img src={icon03} alt="" width="60" height="60" />
          </div>

          <div className="mt-[30px]">
            <h2 className="text-[26px] leading-9 text-headingColor font-[700 text center]">
              Register your Restaurants
            </h2>

            <p className="text-[16px] leading-7 text-text-Color font-[400] text-center mt-4">
              Start with ecTable and get more customers
            </p>

            <Link
              to="Restaurants/RestaurantList"
              className="w-[44px] h-[44px] rounded-full border border-solid mt-auto flex items-center justify-center  bg-primary-Color hover:bg-primaryColor hover:border-none"
            >
              <BsArrowRight className="group-hover:text-white w-6 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

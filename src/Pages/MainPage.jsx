import React, { useState } from "react";
import { useUser } from "../Provider/UserProvider";
import HomePage from "../Components/Home Page When User Is Not Logged In/HomePage";
import HomePageWhenUserLoggedIn from "../Components/Home Page When User Is Logged In/HomePageWhenUserLoggedIn";
import HomeRightSide from "../Components/Home Page When User Is Logged In/HomeRightSide";
import PopularComunities from "../Components/Home Page When User Is Not Logged In/PopularComunities";
// import SideBar from "../Components/DropDowns/SideBar";
function MainPage() {
  const [view, setView] = useState("");
  const { isUserLoggedIn } = useUser();
  return (
    <main className={`pt-14 ${view == 'card' ? 'lg:px-20' : 'w-full'} px-0 h-auto ${isUserLoggedIn ? 'bg-[#dae0e6] dark:bg-[#030303] lg:px-0 w-full' : 'dark:bg-[#030303] dark:text-white'}`}>
      {!isUserLoggedIn ? (
        <div className="flex justify-center gap-6">
          <HomePage setView={setView} view={view} />
          <PopularComunities view={view} />
        </div>
      ) : (
        <div className="flex justify-center gap-4 py-5 lg:px-6 px-2">
          <HomePageWhenUserLoggedIn setView={setView} />
          <HomeRightSide />
          
        </div>
      )}

    </main>
  )
};

export default MainPage;

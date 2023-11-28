import React from "react";
import Logo from "./Logo";
import Search from "../Search/Search";
import RightNavbar from "./RightNavbar";
import { LoginOrSignUp } from "../../Provider/LoginOrSignUp";
import { useUser } from "../../Provider/UserProvider";
import RightNavbarWhenUserLoggedIn from "./RightNavbarWhenUserLoggedIn";
import ToggleSideBar from "../DropDowns/ToggleSideBar";

function Navbar() {
    const {isUserLoggedIn} = useUser();
    return (
        <div className={`flex fixed w-full  ${isUserLoggedIn ?"px-4 gap-8" : "px-2 lg:px-7 "} justify-between z-[100] bg-white dark:bg-darkBg dark:border-darkBorder dark:text-white h-14 items-center border-b border-search`}>
                <Logo />
                {isUserLoggedIn && <ToggleSideBar />}
                <Search />
                {isUserLoggedIn ? <RightNavbarWhenUserLoggedIn /> : <RightNavbar />}
        </div>
        
    )
};

export default Navbar;

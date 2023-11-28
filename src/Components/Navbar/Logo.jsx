import React from "react"
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useSidebar } from "../../Provider/SideBarProvider";
function Logo() {
    const {handleSidebar} = useSidebar();
    return (
        <div className="flex items-center gap-2">
            <div onClick={handleSidebar} className="h-10 w-10 cursor-pointer rounded-full hover:bg-searchHover dark:hover:bg-darkBgHover lg:hidden flex justify-center items-center">
                <MenuIcon />
            </div>
            <NavLink to='/' className="flex items-center gap-0">
                <img src="/Reddit Images/reddit-logo.png" className="w-8 h-8" />
                <img src="/Reddit Images/Reddit-name-logo.png" className="w-16 h-8 ml-2 dark:brightness-0 dark:invert-[1] hidden md:block" />
            </NavLink>
        </div>
    )
};

export default Logo;

import React from "react"
import homeIcon from  '../../../assets/home_filled.svg';
import arrow from  '../../../assets/down_arrow.svg';
import SideBar from './SideBar'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSidebar } from "../../Provider/SidebarProvider";
function ToggleSideBar() {
  const {handleSidebar} = useSidebar();
  const param = useParams();
  console.log("param -> " , param);
  return (
    <>
    <div onClick={handleSidebar} className="md:w-64 gap-4 hidden sm:flex md:justify-between cursor-pointer px-3 duration-200 rounded-md py-2 dark:border-darkBgHover hover:border border-search">
      <div className="flex gap-3 ">
        <img src={homeIcon} className="dark:brightness-0 dark:invert-[1]" />
        <span className="hidden md:block">Home</span>
      </div>
      <img className="dark:brightness-0 dark:invert-[1]" src={arrow} />
    </div> 
    </>
  )
};

export default ToggleSideBar;

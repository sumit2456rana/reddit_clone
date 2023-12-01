import React from "react"
import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex justify-center items-center h-screen flex-col w-full dark:bg-darkBg dark:text-white">
        <img className="h-[400px] w-[600px] mb-4" src="https://www.redditstatic.com/reddit404b.png" />
        <h1>page not found</h1>
        <p>the page you requested does not exist</p>
        <p>Go to <NavLink to='/' className="text-blue-600 hover:underline font-semibold">Home Page</NavLink></p>
    </div>
  )
};

export default PageNotFound;

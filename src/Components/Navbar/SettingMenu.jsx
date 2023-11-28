import React, { useEffect, useState } from "react"
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useLogInOrSignUp } from "../../Provider/LoginOrSignUp";
import { usePopup } from "../../Provider/PopUpProvider";
function SettingMenu({ open }) {
  const {openLogIn} = useLogInOrSignUp();
  const {addToPopUp} = usePopup();
  function handleAddtoPopUp() {
    addToPopUp({message: 'Something cool is coming!' , emotion: 'happy'});
  }
  return (
    <>
      <div className={`dark:bg-darkBg dropdown-menu ${open ? "active" : "inactive"} min-w-[256px] bg-white absolute py-2 h-auto top-10 my-2 right-1 shadow-[0px_0px_11px_6px_rgba(0,0,0,0.1)]`}>
        <ul>
          <li onClick={openLogIn} className="dark:hover:bg-darkBgHover flex gap-3 cursor-pointer hover:bg-[#eeeeee] justify-start items-center py-3 px-4 text-sm">
            <div>
              <LoginOutlinedIcon />
            </div>
            <p>Log In / Sign Up</p>
          </li>
          <li onClick={handleAddtoPopUp} className="dark:hover:bg-darkBgHover flex gap-3 cursor-pointer hover:bg-[#eeeeee] justify-start items-center py-3 px-4 text-sm">
            <div>
              <AdsClickOutlinedIcon />
            </div>
            <p>Adverise on Reddit</p>
          </li>
          <li onClick={handleAddtoPopUp} className="dark:hover:bg-darkBgHover flex gap-3 cursor-pointer hover:bg-[#eeeeee] justify-start items-center py-3 px-4 text-sm">
            <div>
              <ShoppingBagOutlinedIcon />
            </div>
            <p>Shop Collectible Avatars</p>
          </li>
        </ul>

      </div>
  
    </>
  )
};

export default SettingMenu;

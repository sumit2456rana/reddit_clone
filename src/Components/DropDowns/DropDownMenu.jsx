import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import recentIcons from "../../../assets/recent_icons.svg";
import advertiseIcon from "../../../assets/advertise_icon.svg";
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../../Provider/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useStatusAndTheme } from '../../Provider/StatusAndThemeProvider';
import { createPortal } from 'react-dom';
import CreateCommunity from '../Create Community/CreateCommunity';
import {usePopup} from "../../Provider/PopUpProvider";
function DropDownMenu() {
  const { darkTheme, status, handleSetStatus, handleSetTheme } = useStatusAndTheme();
  const dropdownRef = useRef(null);
  const { userData, logout } = useUser();
  const [showCommunity, setShowCommunity] = useState(false);
  const {addToPopUp} = usePopup();
  const navigate = useNavigate();
  const handleMouseDown = (event) => {
    event.stopPropagation();
  };
  const handleProfile = () => {
    navigate(`/user/${userData.name}`);
  }
  const handleLogout = () => {
    logout();
    navigate("/")
  }
  const handleCommunity = () => {
    setShowCommunity(true);
  }
  function handleComingSoon() {
    addToPopUp({message: "Coming Soon-ish—We Promise It's Worth the Wait!", emotion: 'sad'})
  }
  function handlePremium() {
    if(JSON.parse(localStorage.getItem('premium'))){
      addToPopUp({message: 'Already a PRIME member :)' , emotion: 'happy'});
    }else{
      navigate('/premium');
    }
  }
  return (
    <div
      className="dark:bg-darkBg fixed top-14 right-[1.5rem] py-4 overflow-y-auto rounded-md styled-scrollbars mt-0.5 w-64 h-[calc(100vh-150px)]  bg-white shadow-2xl"
      ref={dropdownRef}
      onMouseDown={handleMouseDown}
    >
      <DropDownHeading icon={<AccountCircleOutlinedIcon />} text="My Stuff" />
      <CheckboxContent setIsOnline={handleSetStatus} isTrue={status} text="Online Status" />
      <DropdownContent text="Profile" handleOnClick={handleProfile} />
      <DropdownContent handleOnClick={handleComingSoon} text="Create Avatar" />
      <DropdownContent handleOnClick={handleComingSoon} text="User Settings" />

      <div className='h-[0.5px] my-4 w-full bg-[#00000033] dark:bg-darkBgHover'></div>

      <DropDownHeading icon={<VisibilityOutlinedIcon />} text="View Options" />
      <CheckboxContent setIsOnline={handleSetTheme} isTrue={darkTheme} text="Dark Mode" />

      <div className='h-[0.5px] my-4 w-full bg-[#00000033] dark:bg-darkBgHover'></div>

      <DropdownContent handleOnClick={handleCommunity} icon={<img src={recentIcons} className="dark:brightness-0 dark:invert-[1]" />} text="Create a Community" />
      <DropdownContent handleOnClick={handleComingSoon} icon={<img src={advertiseIcon} className="dark:brightness-0 dark:invert-[1]" />} text="Advertise on Reddit" />
      <DropdownContent handleOnClick={handlePremium} icon={<WorkspacePremiumOutlinedIcon />} text="Premium" />
      <DropdownContent handleOnClick={handleComingSoon} icon={<CampaignOutlinedIcon />} text="Explore" />
    
      <a href='https://support.reddithelp.com/hc/en-us' target='_blank' className={`dark:hover:bg-darkBgHover h-10 cursor-pointer hover:bg-[rgba(0,0,0,0.04)] w-full pl-[25px] pr-4 font-medium flex items-center`}>
        <span className='mr-4'><HelpOutlineOutlinedIcon /></span>
        <p>Help Center</p>
      </a>
      <DropdownContent handleOnClick={handleComingSoon} icon={<InfoOutlinedIcon />} text="More" />
      <DropdownContent handleOnClick={handleComingSoon} icon={<ArticleOutlinedIcon />} text="Terms & Policies" />
      <DropdownContent icon={<LogoutOutlinedIcon />} text="Logout" handleOnClick={handleLogout} />

      <p className='text-xs px-3 py-2  text-center text-[#878A8C] '>Reddit, Inc, © 2023, All rights reseverd</p>
      {showCommunity && createPortal(<CreateCommunity setShowCommunity={setShowCommunity} />, document.getElementById('modal-portal'))}
    </div>
  );
}

function DropDownHeading({ icon, text }) {
  return (
    <div className='flex gap-3 items-center font-semibold pb-2 px-5'>
      <span>{icon}</span>
      <span className='text-[#787C7E]'>{text}</span>
    </div>
  )
}
function CheckboxContent({ text, setIsOnline, isTrue }) {
  const [isChecked, setIsChecked] = useState(isTrue);
  const checkHandler = () => {
    setIsChecked(!isChecked)
  }
  useEffect(() => {
    setIsOnline(isChecked);
  }, [isChecked])
  return (
    <div className='h-10 w-full dark:hover:bg-darkBgHover hover:bg-[rgba(0,0,0,0.04)] font-medium flex items-center pl-[52px] pr-4 justify-between'>
      <p>{text}</p>
      <label class="switch ">
        <input type="checkbox" checked={isChecked} onChange={checkHandler} />
        <span class="slider dark:bg-darkBorder"></span>
      </label>
    </div>
  )
}

function DropdownContent({ icon, text, handleOnClick }) {
  return (
    <div onClick={() => handleOnClick()} className={`dark:hover:bg-darkBgHover h-10 cursor-pointer hover:bg-[rgba(0,0,0,0.04)] w-full ${icon ? 'pl-[25px]' : 'pl-[52px]'} pr-4 font-medium flex items-center`}>
      {icon && <span className='mr-4'>{icon}</span>}
      <p>{text}</p>
    </div>
  )
}

export default DropDownMenu;
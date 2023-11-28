import React from "react"
import popularIcon from "../../../assets/popular_outline.svg"
import chatIcon from "../../../assets/chat_icon.svg"
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import AddIcon from '@mui/icons-material/Add';
import advertiseIcon from "../../../assets/advertise_icon.svg"
import profileIcon from "../../../assets/profile_icon.svg"
import arrow from "../../../assets/down_arrow.svg"
import DropDownMenu from "../DropDowns/DropDownMenu";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useUser } from "../../Provider/UserProvider";
import { useNavigate } from "react-router-dom";
import { useStatusAndTheme } from "../../Provider/StatusAndThemeProvider";
import Notification from "../Notification/Notification";
import { usePopup } from '../../Provider/PopUpProvider';
import { useChat } from "../../Provider/ChatProvider";
function RightNavbarWhenUserLoggedIn() {
    const { status } = useStatusAndTheme();
    const { userData } = useUser();
    const {openChat , isChatOpened, closeChat} = useChat();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);    
    const {addToPopUp} = usePopup();
    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };
    const navigate = useNavigate();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);
    function handleOpenChat() {
        if(isChatOpened) {
            closeChat();
        }else{
            openChat();
        }
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotification(false);
            }
        };

        if (showNotification) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotification]);
    function handleComingSoon() {
        addToPopUp({message: "Something Awesome Is on the Horizon!", emotion: 'sad'})
      }
    return (
        <div className="flex gap-4 items-center 2xl:w-[29rem] lg:w-56">

            {/* Popular Icon */}
            <div className="2xl:flex h-8 w-8 rounded-sm cursor-pointer hidden justify-center dark:hover:bg-darkBgHover items-center hover:bg-searchHover">
                <img src={popularIcon} className="dark:brightness-0 dark:invert-[1]" />
            </div>

            {/* chat icon */}
            <div onClick={handleOpenChat} className="2xl:flex h-8 w-8 rounded-sm cursor-pointer hidden justify-center dark:hover:bg-darkBgHover items-center hover:bg-searchHover">
                <img src={chatIcon} className="dark:brightness-0 dark:invert-[1]" />
            </div>

            {/* notification */}
            <div ref={notificationRef} onClick={() => setShowNotification(p => !p)} className="2xl:flex relative h-8 w-8 rounded-sm cursor-pointer dark:hover:bg-darkBgHover hidden justify-center items-center hover:bg-searchHover">
                <NotificationsNoneRoundedIcon />
                {showNotification && <Notification />}
            </div>

            {/* create Post */}
            <div onClick={() => navigate("/submit")} className="2xl:flex dark:hover:bg-darkBgHover h-8 w-8 rounded-sm hidden justify-center cursor-pointer items-center hover:bg-searchHover">
                <AddIcon />
            </div>

            {/* advertise */}
            <div onClick={handleComingSoon} className="2xl:flex h-8 w-8 dark:hover:bg-darkBgHover dark:bg-darkBgHover bg-search rounded-full cursor-pointer gap-2 hidden justify-center items-center hover:bg-searchHover">
                <img src={advertiseIcon} className="dark:brightness-0 dark:invert-[1]" />
            </div>

            {/* user Profile icons */}
            <div ref={dropdownRef} onClick={toggleDropdown} className="flex relative items-center lg:justify-between lg:w-[14rem] px-2 gap-3 rounded-sm cursor-pointer hover:border dark:border-darkBorder border-bg-search">
                <div
                    className="flex items-center gap-2"
                >
                    <div className="relative">
                        <img className="h-10 rounded-md" src={"https://i.redd.it/snoovatar/avatars/6afe1d9f-f050-4f7b-a180-05e7eb308903.png"} />
                        {status && <span className="h-2 block absolute right-0 bottom-0 w-2 rounded-full bg-[#46d160]"></span>}
                    </div>
                    <div className="pb-1 hidden lg:block">
                        <span className="text-xs font-semibold">{userData.name}</span>
                        <div className="flex gap-1 items-center">
                            <img className="h-3 w-3" src="https://cdn.pixabay.com/photo/2022/02/10/13/34/monster-7005319_1280.png" />
                            <span className="text-[12px] text-[#A8AAAB] font-bold">1 Karma</span>
                        </div>
                    </div>
                </div>
                <img src={arrow} className="dark:brightness-0 dark:invert-[1]" />
            </div>
            {/* <Chat /> */}
            {isDropdownOpen && (
                <DropDownMenu
                    closeDropdown={closeDropdown}
                />
            )}
        </div>
    )
};


export default RightNavbarWhenUserLoggedIn;

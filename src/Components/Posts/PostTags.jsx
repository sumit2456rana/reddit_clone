import React, { useEffect, useRef } from "react"
import RocketOutlinedIcon from '@mui/icons-material/RocketOutlined';
import { useState } from "react";
import cardIcon from "../../../assets/card_icon.svg"
import classicIcon from "../../../assets/classic_icon.svg"
import arrow from "../../../assets/down_arrow.svg"
import PostViewMenu from "./PostViewMenu";
function PostTags({handleSelectedView}) {
    const [tag, setTag] = useState('best');
    const [showMenu, setShowMenu] = useState(false);
    const [selectedView, setSelectedView] = useState('card');
    const menuRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target))
                setShowMenu(false);
        }
        document.addEventListener("mousedown", handler);

        return () => document.removeEventListener("mousedown", handler)

    }, [])
    useEffect(() => {
        handleSelectedView(selectedView)
    } , [selectedView])
    return (
        <div className="flex justify-between relative h-[60px] p-2 rounded gap-3 border items-center w-full border-[#ccc] bg-white dark:bg-darkBg dark:border-darkBorder">
            <div className="flex gap-4">
                <div onClick={() => setTag('best')} className={`${tag == 'best' ? "text-[#0079d3] bg-search dark:bg-darkBgHover" : "text-[#878a8c]"} font-bold flex gap-2 items-center hover:bg-searchHover dark:hover:bg-darkBgHover px-3 cursor-pointer py-2 rounded-3xl`}>
                    <RocketOutlinedIcon />
                    <span>Best</span>
                </div>
                <div onClick={() => setTag('hot')} className={`${tag == 'hot' ? "text-[#0079d3] bg-search dark:bg-darkBgHover" : "text-[#878a8c]"} font-bold flex gap-2 items-center hover:bg-searchHover dark:hover:bg-darkBgHover px-3 cursor-pointer py-2 rounded-3xl`}>
                    <i className="fa-solid fa-fire"></i>
                    <span>Hot</span>

                </div>
                <div onClick={() => setTag('new')} className={`${tag == 'new' ? "text-[#0079d3] bg-search dark:bg-darkBgHover" : "text-[#878a8c]"} font-bold flex gap-2 items-center hover:bg-searchHover dark:hover:bg-darkBgHover px-3 cursor-pointer py-2 rounded-3xl`}>
                    <i className="fa-solid fa-star-of-david"></i>
                    <span>New</span>
                </div>
            </div>
            <div ref={menuRef}>
            <div onClick={() => setShowMenu(v => !v)} className={`flex gap-1 py-2 px-3 cursor-pointer rounded-3xl dark:hover:bg-darkBgHover hover:bg-searchHover ${showMenu && "bg-searchHover dark:bg-darkBgHover"} `}>
                <img src={selectedView === 'classic' ? classicIcon : cardIcon} alt="icons" className="dark:brightness-0 dark:invert-[1]"  />
                <img className={`${showMenu ? 'rotate-180' : ""} duration-300 dark:brightness-0 dark:invert-[1]`} src={arrow} />
            </div>
            {showMenu && <PostViewMenu showMenu={showMenu} setShowMenu={setShowMenu} selectedView={selectedView} setSelectedView={setSelectedView} />}
            </div>
        </div>
    )
};

export default PostTags;

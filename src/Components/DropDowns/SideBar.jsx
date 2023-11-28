import React, { useState } from "react";
import homeFilledIcon from "../../../assets/home_filled.svg"; // Update the path to your SVG file
import homeOutlinedIcon from "../../../assets/home_outline.svg"
import popularOutlineIcon from "../../../assets/popular_outline.svg"
import popularFilledIcon from "../../../assets/popular_filled.svg"
import downArrowIcon from "../../../assets/down_arrow.svg"
import recentIcons from "../../../assets/recent_icons.svg"

import aboutReddit from "../../../assets/reddit_icon.svg"
import advertise from "../../../assets/advertise_icon.svg"
import blog from "../../../assets/blog_icon.svg"
import careers from "../../../assets/careers_icon.svg"
import press from "../../../assets/press_icon.svg"

import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useUser } from "../../Provider/UserProvider";
import { NavLink } from "react-router-dom";
import { usePopup } from "../../Provider/PopUpProvider";
function SideBar() {
    const { isUserLoggedIn } = useUser();
    const {addToPopUp} = usePopup();
    function onClickHandler() {
        addToPopUp({message: "We're working on something special!" , emotion: 'sad'});
    }
    return (
        <aside className={`dark:bg-darkBg dark:border-darkBorder dark:text-white bg-white h-[calc(100vh-55px)] flex flex-col justify-between border-r-2 border-search overflow-scroll styled-scrollbars lg:sticky fixed z-20 top-[55px] ${isUserLoggedIn ? "px-4 w-[300px]" : 'lg:pl-14 pl-4 pr-3 lg:w-[800px] w-[250px]'}`}>
            <div className="py-4 mb-7 min-h-auto">
                <Home />

                <div className=" border-t dark:border-darkBgHover border-[#00000033] w-full my-3"></div>

                <Section heading="Recent">
                    <Recent />
                </Section>

                <div className=" border-t dark:border-darkBgHover border-[#00000033] w-full my-3"></div>

                <Section heading="Topics">
                    <EachTopics onClickHandler={onClickHandler} img={<SportsEsportsOutlinedIcon />} text={"Gaming"} />
                    <EachTopics onClickHandler={onClickHandler} img={<SportsBaseballOutlinedIcon />} text={"Sports"} />
                    <EachTopics onClickHandler={onClickHandler} img={<TvOutlinedIcon />} text={"Television"} />
                    <EachTopics onClickHandler={onClickHandler} img={<StarBorderOutlinedIcon />} text={"Celebrity"} />
                </Section>

                <div className=" border-t border-[#00000033] dark:border-darkBgHover w-full my-3"></div>

                <Section heading="Resources">
                    <EachTopics onClickHandler={onClickHandler} img={<img src={aboutReddit} className="dark:brightness-0 dark:invert-[1]" />} text={"About Reddit"} />
                    <EachTopics onClickHandler={onClickHandler} img={<img src={advertise} className="dark:brightness-0 dark:invert-[1]" />} text={"Advertise"} />
                    <EachTopics onClickHandler={onClickHandler} img={<HelpOutlineOutlinedIcon />} text={"Help"} />
                    <EachTopics onClickHandler={onClickHandler} img={<img src={blog} className="dark:brightness-0 dark:invert-[1]" />} text={"Blog"} />
                    <EachTopics onClickHandler={onClickHandler} img={<img src={careers} className="dark:brightness-0 dark:invert-[1]" />} text={"Careers"} />
                    <EachTopics onClickHandler={onClickHandler} img={<img src={press} className="dark:brightness-0 dark:invert-[1]" />} text={"Press"} />
                </Section>


            </div>
            <div>
                <a target="_blank" className="text-xs hover:underline" href="https://www.redditinc.com/">Reddit, Inc, &copy; 2023, All rights reseverd</a>
            </div>
        </aside>
    );
}

function Home() {
    const [selected, setSelected] = useState("home");
    return (
        <>
            <div onClick={() => setSelected("home")} className={`flex dark:hover:bg-darkBgHover gap-4 py-2 px-5 rounded-md hover:bg-[#EAEDEF] cursor-pointer ${selected == 'home' ? "bg-[#EAEDEF] dark:bg-darkBgHover" : ""}`}>
                <img className="dark:brightness-0 dark:invert-[1]" src={selected == "home" ? homeFilledIcon : homeOutlinedIcon} />
                <span>Home</span>
            </div>
            <div onClick={() => setSelected("popular")} className={`flex dark:hover:bg-darkBgHover gap-4 py-2 px-5 rounded-md hover:bg-[#EAEDEF] cursor-pointer ${selected == 'popular' ? "bg-[#EAEDEF] dark:bg-darkBgHover" : ""}`}>
                <img className="dark:brightness-0 dark:invert-[1]" src={selected == "popular" ? popularFilledIcon : popularOutlineIcon} />
                <span>Popular</span>
            </div>
        </>
    )
}

function Section({ heading, children }) {
    const [show, setShow] = useState(false);
    return (
        <div>
            <div onClick={() => setShow(v => !v)} className="flex justify-between items-center cursor-pointer p-3 ">
                <span className="uppercase text-xs opacity-7 tracking-widest dark:text-iconsDark">{heading}</span>
                <img className={`${show ? 'rotate-180' : ''} duration-300 dark:brightness-0 dark:invert-[1] dark:mix-blend-soft-light`} src={downArrowIcon} />
            </div>
            {show && children}
        </div>
    )
}

function Recent() {
    const [recents] = useState(JSON.parse(localStorage.getItem('Recents')));

    return (
        <>
            {recents ? recents.map((e) => (
                <NavLink to={`/r/${e.name}/${e.id}`} key={e.id} className={`flex gap-4 py-2 px-5 items-center rounded-md dark:hover:bg-darkBgHover hover:bg-[#EAEDEF] cursor-pointer`}>
                    <img className="h-8 w-8 rounded-full" src={e.image ? e.image : recentIcons} />
                    <span className="text-sm">r/{e.name}</span>
                </NavLink>
            )) :
                <div className={`flex gap-4 py-2 px-5 items-center rounded-md dark:hover:bg-darkBgHover hover:bg-[#EAEDEF]`}>
                    <span className="text-sm">No Recents</span>
                </div>
            }

        </>

    )
}

function EachTopics({ img, text, onClickHandler }) {
    return (
        <div onClick={onClickHandler} className={`flex gap-4 py-2 px-5 items-center rounded-md dark:hover:bg-darkBgHover hover:bg-[#EAEDEF] cursor-pointer`}>
            {img}
            <span className="text-sm">{text}</span>
        </div>
    )
}
export default React.memo(SideBar);


import { useEffect } from "react"
import cardIcon from "../../../assets/card_icon.svg"
import classicIcon from "../../../assets/classic_icon.svg"
const PostViewMenu = ({setSelectedView , selectedView , setShowMenu, showMenu}) => {
    useEffect(() => {
        console.log(showMenu);
    },[showMenu])
    function handleViews(view) {
        setSelectedView(view);
        setShowMenu(false);
        console.log("clicked");
    }
    return (
        <div className="dark:bg-darkBg dark:text-white absolute z-10 top-14 right-[0px] shadow-[0_0px_15px_-1px_rgba(0,0,0,0.4)] bg-white h-36 w-28">
            <p className="p-3 font-semibold">View</p>
            <div onClick={() => handleViews('card')} className={`flex gap-2 cursor-pointer hover:bg-[#EAEDEF] dark:hover:bg-darkBgHover py-3 px-5 ${selectedView == 'card' ? "bg-[#EAEDEF] dark:bg-darkBgHover" : ''}`}>
                <img src={cardIcon} className="dark:brightness-0 dark:invert-[1]" />
                <span>Card</span>
            </div>
            <div onClick={() => handleViews('classic')} className={`flex gap-2 hover:bg-[#EAEDEF] dark:hover:bg-darkBgHover cursor-pointer py-3 px-5 ${selectedView == 'classic' ? "bg-[#EAEDEF] dark:bg-darkBgHover" : ''}`}>
                <img src={classicIcon} className="dark:brightness-0 dark:invert-[1]" />
                <span>Classic</span>
            </div>
        </div>
    )
}

export default PostViewMenu;
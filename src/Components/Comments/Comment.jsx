import React, { useEffect, useRef, useState } from "react"
import shareIcon from '../../../assets/share_icon.svg';
import commentIcon from '../../../assets/comment_icon.svg';
import { usePopup } from "../../Provider/PopUpProvider";

function Comment({ commentCount, pathName }) {
    const [isLinkOpen, setIsLinkOpen] = useState(false);
    const copyLinkRef = useRef(null);
    const {addToPopUp} = usePopup();
    const closeLinkOpen = () => {
        setIsLinkOpen(false);
    }
    function handleShare(e) {
        e.preventDefault();
        setIsLinkOpen(!isLinkOpen);
    }
    const handleCopylink = () => {
        let origin = window.location.origin;
        let link = origin + pathName;

        const el = document.createElement('input');
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        addToPopUp({message: 'Link Copied to Clipboard' , emotion: 'happy'});
    }
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (copyLinkRef.current && !copyLinkRef.current.contains(e.target)) {
                closeLinkOpen();
            }
        }

        if (isLinkOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mouseover', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isLinkOpen])
    return (
        <div className="flex gap-3 text-sm">
            <div className="px-3 py-2 dark:hover:bg-darkBgHover cursor-pointer rounded text-[#878A8C] font-bold flex gap-3 hover:bg-search">
                <img src={commentIcon} className="dark:brightness-0 dark:invert-[1]" />
                <span>{commentCount} Comments</span>
            </div>
            <div ref={copyLinkRef} onClick={handleShare} className="relative   text-[#878A8C] cursor-pointer font-bold">
                <div className="flex gap-3 dark:hover:bg-darkBgHover hover:bg-search rounded px-3 py-2">
                    <img src={shareIcon} className="dark:brightness-0 dark:invert-[1]" />
                    <span>Share</span>
                </div>

                {isLinkOpen && <div onClick={handleCopylink} className="absolute flex gap-2 font-medium items-center dark:bg-darkBg dark:text-white dark:hover:bg-darkBgHover hover:bg-search py-2 px-3 text-black bg-white w-32 shadow-[0_0_5px_0.5px_rgba(0,0,0,.2)] left-0 top-[40px] z-10 rounded-md">
                    <i className="fa-solid fa-link"></i>
                    <p>Copy Link</p>
                </div>}
            </div>
        </div>
    )
};

export default Comment;

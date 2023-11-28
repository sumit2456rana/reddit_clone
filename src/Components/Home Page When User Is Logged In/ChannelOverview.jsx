import React from "react"
import { useNavigate } from "react-router-dom";

function ChannelOverview({image , channelName , top, channelId}) {
    const navigate = useNavigate();
  return (
    <div onClick={(e) => e.preventDefault()} className={`max-w-[380px] dark:bg-darkBg dark:border-darkBgHover dark:text-white cursor-default text-black min-w-[340px] p-4 z-50 rounded h-auto bg-white absolute ${top ? `top-${top}` : 'top-8'} shadow-[0_1px_3px_rgba(0,0,0,.2)]`}>
        <div className="flex items-center gap-3">
            <img className="h-10 w-10 rounded-full" src={image} />
            <span className="font-semibold">r/{channelName}</span>
        </div>
        <div className="flex pt-3 gap-20">
            <div>
                <p className="font-semibold">{Math.floor(Math.random() * 1000)}k</p>
                <p className="text-[#7c7c7c] text-xs font-medium">Members</p>
            </div>
            <div className="pl-5 border-l border-[#ccc]">
                <p className="font-semibold">{Math.floor(Math.random() * 1000)}</p>
                <p className="text-[#7c7c7c] text-xs font-medium">Online</p>
            </div>
        </div>
        <p className="py-2 text-xs text-[#7c7c7c] font-semibold">r/{channelName}: The official community !</p>
        <button onClick={() => navigate(`/r/${channelName}/${channelId}`)} className="dark:bg-darkBtn dark:text-black w-full py-1 font-semibold bg-[#0079D3] rounded-2xl text-white hover:bg-[rgba(0,121,211,0.9)]">View Community</button>
    </div>
  )
};

export default  ChannelOverview;

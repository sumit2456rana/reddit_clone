import React from "react"
import { useNavigate } from "react-router-dom";

function Notification() {
    const navigate = useNavigate();
    function handleNotifaction(e) {
        e.preventDefault();
    }
    return (
        <div onClick={handleNotifaction} className="absolute shadow-2xl rounded border border-[#ccc] dark:border-darkBorder p-5 cursor-default dark:bg-darkBg bg-white w-80 h-[400px] top-11 right-[-20px]">
            <h1 className="font-bold text-lg">Notification</h1>
            <img className="h-32 mx-auto mt-10" src="https://www.redditstatic.com/desktop2x/img/wrappedreddit/default_avatar.png" />
            <p className="font-semibold text-center mt-2">You don’t have any activity yet</p>
            <p className="text-xs text-center mt-2 text-[#7c7c7c] font-medium">That’s ok, maybe you just need the right inspiration. Try posting in r/StageAndScreen , a popular community for discussion.</p>
            <button onClick={() => navigate("r/StageAndScreen/64e5ef9e467bbeae5d846e00")} className="mx-auto grid mt-6 py-2 px-4 bg-[#0079D3] text-white rounded-3xl font-semibold">Visit r/StageAndScreen</button>
        </div>
    )
};

export default Notification;

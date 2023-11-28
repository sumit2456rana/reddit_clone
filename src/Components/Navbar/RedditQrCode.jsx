import React from "react"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
function RedditQrClone({setShowQr}) {
  return (
    <div className="flex justify-center w-full items-center fixed top-0 left-0 right-0 bottom-0 bg-[#00000080] h-screen z-10">
        <div className=" h-auto w-[35%] min-w-[360px] p-4 rounded-md dark:bg-[#131F23] bg-white">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Get the Reddit app</h1>
                <span onClick={() => setShowQr(false)} className="h-10 w-10 flex justify-center items-center cursor-pointer rounded-full dark:bg-[#0b1416] bg-search hover:bg-searchHover">
                    <CloseRoundedIcon />
                </span>
            </div>
            <div className="flex flex-col justify-center items-center py-6">
                <p className="text-md font-bold">Scan this QR code to</p>
                <p className="text-md font-bold">download the app now</p>
                <img className="h-52 w-52 my-4" src="https://www.redditstatic.com/shreddit/assets/shreddit-qr-code.svg" />
                <p>Or check it out in the app stores</p>
                <div className="flex gap-5 items-center mt-3">
                    <a target="_blank" href="https://play.google.com/store/apps/details?id=com.reddit.frontpage"><img src="https://www.redditstatic.com/shreddit/assets/google-play.svg" /></a>
                    <a target="_blank" href="https://apps.apple.com/us/app/reddit/id1064216828"><img src="https://www.redditstatic.com/shreddit/assets/app-store.svg" /></a> 
                </div>
            </div>
        </div>
    </div>
  )
};

export default RedditQrClone;

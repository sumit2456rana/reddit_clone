import React, { useState } from "react"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { createPortal } from "react-dom";
import { usePopup } from "../Provider/PopUpProvider";
import { useNavigate } from "react-router-dom";
const premiumFeatures = [
    {
        img: "https://www.redditstatic.com/desktop2x/img/gold/premium-marketing/benefits-icons/premium-ad-free.png",
        title: 'Ad-free Browsing',
        desc: 'Enjoy redditing without interruptions from ads',
    },
    {
        img: '	https://www.redditstatic.com/desktop2x/img/gold/premium-marketing/benefits-icons/premium-avatars.png',
        title: 'Exclusive Avatar Gear',
        desc: 'Outfit your avatar with the best gear and accessories',
    },
    {
        img: '	https://www.redditstatic.com/desktop2x/img/gold/premium-marketing/benefits-icons/premium-lounge.png',
        title: 'Members Lounge',
        desc: 'Discover all the illuminati secrets in r/lounge',
    },
    {
        img: 'https://www.redditstatic.com/desktop2x/img/gold/premium-marketing/benefits-icons/premium-app-icons.png',
        title: 'Custom App Icons*',
        desc: 'Change your app icon to something more your style',
    },
]
function Premium() {
    const [openScanner, setOpenScanner] = useState("");
    function handleOpenScanner(val) {
        setOpenScanner(val);
    }
    return (
        <div className="pt-14 overflow-x-hidden">
            <div className="premium-bg-image">
                <div className="w-[85%] max-w-[1440px] mx-auto">
                    <div>
                        {/* <img src="/Reddit Images/PremiumLogo.png" /> */}
                        <h1 className="mt-0 mb-3"><svg class="_2QdbMXAwLpWVLJfDJ275mD max-w-[558px] h-auto" viewBox="0 0 630 96" xmlns="http://www.w3.org/2000/svg"><path fill="#ff4500" d="M95.349,6.185a3.136,3.136,0,0,0-2.458-1.2H88.517A164.2,164.2,0,0,1,48.761.1a2.962,2.962,0,0,0-1.5,0A164.2,164.2,0,0,1,7.509,4.988H3.125A3.111,3.111,0,0,0,.1,8.858,164.1,164.1,0,0,1,5,48.614V67.819A20.392,20.392,0,0,0,25.362,88.186a33.738,33.738,0,0,1,20.721,7.151,3.126,3.126,0,0,0,3.85,0,33.734,33.734,0,0,1,20.721-7.151A20.391,20.391,0,0,0,91.02,67.819V48.614A164.147,164.147,0,0,1,95.913,8.858,3.119,3.119,0,0,0,95.349,6.185Z"></path><path fill="#fff" d="M79.992,48a7,7,0,0,0-11.855-5.036,34.261,34.261,0,0,0-18.72-5.939l3.189-15,10.418,2.215a5.008,5.008,0,1,0,.512-2.447L51.9,19.318a1.25,1.25,0,0,0-1.483.963l-3.561,16.74a34.368,34.368,0,0,0-18.994,5.93,7,7,0,1,0-7.706,11.432,13.771,13.771,0,0,0-.167,2.117c0,10.77,12.536,19.5,28,19.5s28-8.73,28-19.5a13.851,13.851,0,0,0-.164-2.1A7,7,0,0,0,79.992,48ZM32,53a5,5,0,1,1,5,5A5.007,5.007,0,0,1,32,53ZM59.88,66.212c-3.412,3.408-9.951,3.673-11.874,3.673s-8.463-.265-11.872-3.673a1.3,1.3,0,1,1,1.833-1.832c2.151,2.151,6.752,2.914,10.039,2.914s7.889-.764,10.043-2.915a1.3,1.3,0,1,1,1.831,1.833ZM59,58a5,5,0,1,1,5-5A5.006,5.006,0,0,1,59,58Z"></path><path fill="#ff4500" d="M157.1,75.454H144.637l-9.8-17.217q-1.416.069-2.157.068h-4.11V75.454H117.515V25.793h17.924a20.921,20.921,0,0,1,8.861,1.8,14.209,14.209,0,0,1,6.132,5.238,14.742,14.742,0,0,1,2.223,8.187,16.721,16.721,0,0,1-1.971,8.07,15.976,15.976,0,0,1-5.643,5.979ZM128.566,49.31h5.559a9.153,9.153,0,0,0,4.009-.843,6.444,6.444,0,0,0,2.729-2.392,6.61,6.61,0,0,0,.977-3.605,6.53,6.53,0,0,0-.994-3.6,6.46,6.46,0,0,0-2.83-2.392,10.222,10.222,0,0,0-4.295-.842h-5.155Z"></path><path fill="#ff4500" d="M190.659,60.765H166.267a9.356,9.356,0,0,0,3.453,4.969,9.772,9.772,0,0,0,5.913,1.8,16.426,16.426,0,0,0,4.885-.774,12.255,12.255,0,0,0,3.841-1.82l3.3,7.952a17.24,17.24,0,0,1-5.223,2.256,25.442,25.442,0,0,1-6.637.843,20.944,20.944,0,0,1-10.141-2.358,16.56,16.56,0,0,1-6.7-6.571,19.369,19.369,0,0,1-2.359-9.635,19.506,19.506,0,0,1,2.426-9.821,17.172,17.172,0,0,1,6.519-6.587,17.812,17.812,0,0,1,8.945-2.325,17.062,17.062,0,0,1,8.474,2.14,15.607,15.607,0,0,1,6.03,6.014,17.519,17.519,0,0,1,2.207,8.827A24.352,24.352,0,0,1,190.659,60.765Zm-9.265-6.671a6.819,6.819,0,0,0-1.937-5.121,7.005,7.005,0,0,0-5.1-1.887,7.868,7.868,0,0,0-5.374,1.9,9.209,9.209,0,0,0-2.881,5.105Z"></path><path fill="#ff4500" d="M222.464,23.569H233.11V75.454H222.969V71.107H222.8a14.246,14.246,0,0,1-10.984,4.886,16.227,16.227,0,0,1-14.453-8.676,20.341,20.341,0,0,1-2.325-9.956,20.057,20.057,0,0,1,2.409-10.09,16.53,16.53,0,0,1,6.317-6.418,16.889,16.889,0,0,1,8.389-2.19,14.771,14.771,0,0,1,5.576,1.027,13.657,13.657,0,0,1,4.5,2.949h.236Zm-3.892,42.08a8.72,8.72,0,0,0,3.184-3.385,10.184,10.184,0,0,0,1.18-4.936,10.386,10.386,0,0,0-1.129-4.886,8.422,8.422,0,0,0-3.133-3.369,8.588,8.588,0,0,0-4.532-1.213,8.682,8.682,0,0,0-4.532,1.2,8.429,8.429,0,0,0-3.15,3.336,10.152,10.152,0,0,0-1.145,4.868,10.585,10.585,0,0,0,1.128,4.919,8.55,8.55,0,0,0,3.151,3.436,8.81,8.81,0,0,0,8.978.033Z"></path><path fill="#ff4500" d="M264.848,23.569h10.646V75.454H265.353V71.107h-.168A14.246,14.246,0,0,1,254.2,75.993a16.227,16.227,0,0,1-14.453-8.676,20.341,20.341,0,0,1-2.325-9.956,20.057,20.057,0,0,1,2.409-10.09,16.523,16.523,0,0,1,6.317-6.418,16.886,16.886,0,0,1,8.389-2.19,14.771,14.771,0,0,1,5.576,1.027,13.657,13.657,0,0,1,4.5,2.949h.236Zm-3.892,42.08a8.728,8.728,0,0,0,3.184-3.385,10.183,10.183,0,0,0,1.179-4.936,10.374,10.374,0,0,0-1.129-4.886,8.412,8.412,0,0,0-3.132-3.369,8.591,8.591,0,0,0-4.532-1.213,8.679,8.679,0,0,0-4.532,1.2,8.422,8.422,0,0,0-3.15,3.336,10.152,10.152,0,0,0-1.145,4.868,10.585,10.585,0,0,0,1.128,4.919,8.55,8.55,0,0,0,3.151,3.436,8.81,8.81,0,0,0,8.978.033Z"></path><path fill="#ff4500" d="M284.456,34.148a6.617,6.617,0,0,1-2.342-8.928,6.192,6.192,0,0,1,2.342-2.324,6.561,6.561,0,0,1,3.3-.843,6.493,6.493,0,0,1,3.268,12.1,6.6,6.6,0,0,1-6.57,0Zm8.591,41.306H282.4V39.2h10.646Z"></path><path fill="#ff4500" d="M315.418,39.2H323.2v9.063h-7.783V75.454H304.772V48.265h-7.749V39.2h7.749V28.825h10.646Z"></path><path fill="#ff4500" d="M367.428,27.8a14.469,14.469,0,0,1,6.317,5.71,16.7,16.7,0,0,1,2.19,8.659A17.514,17.514,0,0,1,373.7,51.1a15.51,15.51,0,0,1-6.318,6.031,19.809,19.809,0,0,1-9.4,2.156h-6.166V75.454H340.761V25.793h16.913A22.1,22.1,0,0,1,367.428,27.8ZM357.405,49.545a8.728,8.728,0,0,0,4.076-.909,6.562,6.562,0,0,0,2.7-2.51,7.005,7.005,0,0,0,.943-3.622,6.126,6.126,0,0,0-2.173-5.021A8.958,8.958,0,0,0,357,35.631h-5.188V49.545Z"></path><path fill="#ff4500" d="M404.775,38.882a5.377,5.377,0,0,1,1.651.522l-4.279,10.175a5.732,5.732,0,0,0-1.263-.388,8.251,8.251,0,0,0-1.736-.185,8.08,8.08,0,0,0-3.622.876,7.359,7.359,0,0,0-2.914,2.628,7.721,7.721,0,0,0-1.145,4.312V75.454H380.82V39.2h10.344v5.087h.2a15.107,15.107,0,0,1,4.582-4.025,12.458,12.458,0,0,1,6.367-1.6A13.1,13.1,0,0,1,404.775,38.882Z"></path><path fill="#ff4500" d="M440.151,60.765H415.758a9.367,9.367,0,0,0,3.453,4.969,9.776,9.776,0,0,0,5.914,1.8,16.431,16.431,0,0,0,4.885-.774,12.255,12.255,0,0,0,3.841-1.82l3.3,7.952a17.234,17.234,0,0,1-5.222,2.256,25.447,25.447,0,0,1-6.637.843,20.941,20.941,0,0,1-10.141-2.358,16.562,16.562,0,0,1-6.7-6.571,19.379,19.379,0,0,1-2.358-9.635,19.5,19.5,0,0,1,2.426-9.821,17.172,17.172,0,0,1,6.519-6.587,17.812,17.812,0,0,1,8.945-2.325,17.062,17.062,0,0,1,8.474,2.14,15.613,15.613,0,0,1,6.03,6.014,17.519,17.519,0,0,1,2.207,8.827A24.352,24.352,0,0,1,440.151,60.765Zm-9.265-6.671a6.819,6.819,0,0,0-1.937-5.121,7.006,7.006,0,0,0-5.105-1.887,7.869,7.869,0,0,0-5.374,1.9,9.213,9.213,0,0,0-2.88,5.105Z"></path><path fill="#ff4500" d="M493.282,40.7a10.863,10.863,0,0,1,3.74,5.121,19.607,19.607,0,0,1,1.078,6.52V75.454H487.386v-21.8a7.294,7.294,0,0,0-1.246-4.564,4.257,4.257,0,0,0-3.572-1.6,4.976,4.976,0,0,0-3.857,1.6,6.515,6.515,0,0,0-1.466,4.564v21.8H466.6v-21.8a7.288,7.288,0,0,0-1.247-4.564,4.294,4.294,0,0,0-3.6-1.6,4.955,4.955,0,0,0-3.857,1.617,6.637,6.637,0,0,0-1.466,4.616V75.454H445.777V39.2h10.141v4.615h.169a12.481,12.481,0,0,1,4.312-3.84,11.742,11.742,0,0,1,5.559-1.314,10.357,10.357,0,0,1,5.256,1.28,9.366,9.366,0,0,1,3.572,3.774h.2a12.728,12.728,0,0,1,4.868-3.757,15.291,15.291,0,0,1,6.284-1.3A11.461,11.461,0,0,1,493.282,40.7Z"></path><path fill="#ff4500" d="M506.826,34.148a6.617,6.617,0,0,1-2.342-8.928,6.2,6.2,0,0,1,2.342-2.324,6.561,6.561,0,0,1,3.3-.843,6.493,6.493,0,0,1,3.268,12.1,6.6,6.6,0,0,1-6.57,0Zm8.591,41.306H504.771V39.2h10.646Z"></path><path fill="#ff4500" d="M544.763,39.2h10.646V75.487H545.133V70.7h-.269a11.143,11.143,0,0,1-4.549,3.892,14.315,14.315,0,0,1-6.367,1.431,11.771,11.771,0,0,1-6.351-1.667,10.928,10.928,0,0,1-4.111-4.632,15.394,15.394,0,0,1-1.431-6.773V39.2H532.7V60.6a7.073,7.073,0,0,0,1.516,4.885,5.337,5.337,0,0,0,4.178,1.685,6.3,6.3,0,0,0,4.582-1.735,6.524,6.524,0,0,0,1.786-4.9Z"></path><path fill="#ff4500" d="M609.652,40.7a10.863,10.863,0,0,1,3.74,5.121,19.607,19.607,0,0,1,1.078,6.52V75.454H603.756v-21.8a7.294,7.294,0,0,0-1.246-4.564,4.257,4.257,0,0,0-3.572-1.6,4.978,4.978,0,0,0-3.857,1.6,6.52,6.52,0,0,0-1.466,4.564v21.8H582.969v-21.8a7.288,7.288,0,0,0-1.247-4.564,4.294,4.294,0,0,0-3.605-1.6,4.955,4.955,0,0,0-3.857,1.617,6.637,6.637,0,0,0-1.466,4.616V75.454H562.147V39.2h10.142v4.615h.168a12.475,12.475,0,0,1,4.313-3.84,11.737,11.737,0,0,1,5.559-1.314,10.356,10.356,0,0,1,5.255,1.28,9.366,9.366,0,0,1,3.572,3.774h.2a12.723,12.723,0,0,1,4.869-3.757,15.283,15.283,0,0,1,6.283-1.3A11.459,11.459,0,0,1,609.652,40.7Z"></path></svg></h1>
                    </div>
                    <p className="text-xl font-bold max-w-[560px] mb-6">Help support Reddit and get VIP treatment and exclusive access.</p>
                    <div className="lg:text-left text-center">
                        <button onClick={() => handleOpenScanner("month")} className="inline-block min-w-[256px] max-w-[360px] h-[42px] text-sm font-bold border border-white rounded-3xl">$5.99/Month</button>
                        <button onClick={() => handleOpenScanner("year")} className="inline-block min-w-[256px] max-w-[360px] h-[42px] text-sm font-bold sm:ml-2 rounded-3xl bg-[#ff4500] align-middle mt-2 sm:mt-0 ml-0">
                            $49.99/Year
                            <span className="px-3 py-1 ml-1 bg-white rounded-2xl text-[#ff4500] text-xs">Save 30%</span>
                        </button>
                        <p className="mt-4 text-[#d3d6da] text-xs font-normal">Subscriptions automatically renew</p>
                    </div>
                </div>
            </div>
            <div className="py-12 dark:bg-darkBg dark:text-white">
                <h1 className="text-3xl text-center mb-7 px-1 font-bold">Join Reddit Premium Today</h1>
                <div className="flex justify-center flex-wrap w-full px-4 gap-3 mb-6">
                    {premiumFeatures.map((e, i) => (
                        <div key={i} className="w-[180px] bg-[#F6F7F8] dark:bg-[#272729] min-h-[128px] rounded-2xl px-2 pt-2 pb-3 flex flex-col justify-center items-center">
                            <div className="w-12 h-12 mx-auto mb-2 bg-[50%] bg-contain bg-no-repeat" style={{ backgroundImage: `url(${e.img})` }}></div>
                            <h3 className="mb-1 text-sm font-medium">{e.title}</h3>
                            <p className="text-[#878A8C] text-xs text-center">{e.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <button onClick={() => handleOpenScanner("month")} className="inline-block min-w-[256px] max-w-[360px] h-[42px] text-sm font-bold border border-[#ff4500] text-[#ff4500] rounded-3xl">$5.99/Month</button>
                    <button onClick={() => handleOpenScanner("year")} className="inline-block min-w-[256px] max-w-[360px] h-[42px] text-sm font-bold sm:ml-2 rounded-3xl bg-[#ff4500] align-middle sm:mt-0 mt-2 ml-0">
                        $49.99/Year
                        <span className="px-3 py-1 ml-1 bg-white rounded-2xl text-[#ff4500] text-xs">Save 30%</span>
                    </button>
                    <p className="mt-4 text-[#7c7c7c] text-xs font-normal">Subscriptions automatically renew</p>
                    <p className="mt-4 text-[#7c7c7c] text-xs font-normal">* Custom app icons are only available through a paid Reddit Premium subscription.</p>
                </div>
            </div>
            {openScanner && createPortal(<Scanner preiod={openScanner} handleOpenScanner={handleOpenScanner} />, document.getElementById('modal-portal'))}
        </div>
    )
};

function Scanner({ preiod, handleOpenScanner }) {
    const navigate = useNavigate();
    const {addToPopUp} = usePopup();
    function handlePayment() {
        addToPopUp({message: 'Thank You for Upgrading to Premium!' , emotion: 'happy'})
        navigate('/');
        localStorage.setItem('premium' , true);
    }
    return ( 
        <div className="modal">
            <div className=" h-auto w-[33%] min-w-[360px] p-4 rounded-md dark:bg-darkBg dark:text-white bg-white">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold">Discover Reddit Premium by scanning the QR code now!</h1>
                    <span onClick={() => handleOpenScanner("")} className="h-8 w-8 flex justify-center items-center cursor-pointer rounded-full dark:bg-[#0b1416] dark:hover:bg-darkBgHover bg-search hover:bg-searchHover">
                        <CloseRoundedIcon />
                    </span>
                </div>
                <img className="h-52 w-52 my-4 mx-auto rounded-2xl" src={preiod === 'month' ? '/Reddit Images/499 Scanner.png' : '/Reddit Images/4164 Scanner.png'} />
                <p className="text-center font-medium">Pay <span className="text-[#ff4500] font-bold">{preiod === 'month' ? '499' : '4,164'} &#8377; </span> for {preiod}</p>

                <button onClick={handlePayment} className="mx-auto grid my-4 w-auto px-10 py-2 font-semibold text-white rounded-3xl bg-[#ff4500]">Is payment done?</button>
            </div>
        </div>
    )
}
export default Premium;

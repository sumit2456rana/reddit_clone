import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import BackToTopBtn from "./BackToTopBtn";
import CreateCommunity from "../Create Community/CreateCommunity";
import { createPortal } from "react-dom";
import { usePopup } from "../../Provider/PopUpProvider";
function HomeRightSide() {
    return (
        <div className="lg:block hidden">
            <PremiumCard />
            <CreateCard />
            <UserAgreementCard />
            <BackToTopBtn />
        </div>
    )
};

function PremiumCard() {
    const navigate = useNavigate();
    const {addToPopUp} = usePopup();
    function handlePremiumBtn() {
        if(JSON.parse(localStorage.getItem('premium'))) {
            addToPopUp({message: 'Already a PRIME member :)' , emotion: 'happy'});
        }else{
            navigate('/premium')
        }
    }
    return (
        <div className="w-80 h-auto bg-white dark:bg-darkBg dark:border-darkBorder dark:text-white border border-[#ccc] rounded p-3">
            <div className="flex items-start gap-3">
                <img className="h-6 w-6" src='/Reddit Images/premiumLogo.png' />
                <div className="text-xs">
                    <span className="font-semibold">Reddit Premium</span><br />
                    <span>The best Reddit experience</span>
                </div>
            </div>
            <button onClick={handlePremiumBtn} className="w-full font-bold bg-[#ff4500] py-1 mt-2 text-white rounded-2xl">{JSON.parse(localStorage.getItem('premium')) === true ? 'Hello! Prime member' : 'Try Now'}</button>
        </div>
    )
}
function CreateCard() {
    const navigate = useNavigate();
    const [showCommunity, setShowCommunity] = useState(false);
    return (
        <div className="w-80 h-auto bg-white border border-[#ccc] mt-4 rounded p-3 dark:bg-darkBg dark:border-darkBorder dark:text-white">
            <div style={{ backgroundImage: 'url(https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png)', backgroundSize: 'cover', height: '34px', margin: '-12px -12px 10px' }}></div>
            <div className="mt-[-23px] mb-2 flex items-center">
                <div style={{ backgroundImage: 'url(https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png)', backgroundSize: '40px 68px', height: '68px', width: '40px' }}></div>
                <h1 className="mt-7 ml-2 font-semibold">Home</h1>
            </div>
            <p className="text-[#1C1C1C] dark:text-white">Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
            <hr className="my-4 dark:border-darkBorder" />
            <button onClick={() => navigate('/submit')} className="dark:bg-darkBtn dark:text-black w-full py-1 font-semibold bg-[#0079D3] rounded-2xl mb-4 text-white hover:bg-[rgba(0,121,211,0.9)]">Create Post</button>
            <button onClick={() => setShowCommunity(true)} className="dark:border-darkBtn dark:text-darkBtn w-full py-1 font-semibold border border-[#0079D3] rounded-2xl text-[#0079D3]">Create Comunitiy</button>
            {showCommunity && createPortal(<CreateCommunity setShowCommunity={setShowCommunity} /> , document.getElementById('modal-portal'))}
        </div>
    )
}
function UserAgreementCard() {
    return (
        <div className="dark:bg-darkBg dark:border-darkBorder  w-80 text-xs sticky top-[65px] font-medium h-auto agreement bg-white border border-[#ccc] mt-4 rounded p-3">
            <div className="flex gap-14">
                <div className="flex flex-col w-[35%] dark:text-white">
                    <p className="dark:text-white">User Agreement</p>
                    <p className="dark:text-white">Privacy Policy</p>
                </div>
                <div className="flex flex-col w-[35%]">
                    <p className="dark:text-white">Content Policy</p>
                    <p className="dark:text-white">Moderator Code of Conduct</p>
                </div>
            </div>
            <hr className="my-2" />
            <div className="flex gap-14">
                <div className="flex flex-col w-[35%]">
                    <p className="dark:text-white">English</p>
                    <p className="dark:text-white">Français</p>
                    <p className="dark:text-white">Italiano</p>
                </div>
                <div className="flex flex-col w-[35%]">
                    <p className="dark:text-white">Deutsch</p>
                    <p className="dark:text-white">Español</p>
                    <p className="dark:text-white">Português</p>
                </div>
            </div>
            <hr className="my-2"/>
            <p className="mx-3 dark:text-white">Reddit, Inc. © 2023. All rights reserved.</p>
        </div>
    )
}

export default HomeRightSide;

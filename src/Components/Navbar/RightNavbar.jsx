import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import React, { useEffect, useRef, useState } from 'react';
import SettingMenu from './SettingMenu'
import RedditQrClone from './RedditQrCode';
import LogIn from '../Login & SignUp/LogIn';
import SignUp from '../Login & SignUp/SignUp';
import { useLogInOrSignUp } from '../../Provider/LoginOrSignUp';
import SignUpNextPage from '../Login & SignUp/SignUpNextPage';
import { createPortal } from 'react-dom';
export default function RightNavbar() {
    const { showLogin, showSignUp, openLogIn, showNextPage } = useLogInOrSignUp();
    const [showSettingMenu, setShowSettingMenu] = useState(false);
    const [showQr, setShowQr] = useState(false);
    const [email, setEmail] = useState("");
    function handleRightMenu() {
        setShowSettingMenu(v => !v)
    }
    const menuRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target))
                setShowSettingMenu(false);
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])

    function handleSetEmail(v) {
        setEmail(v);

    }
    useEffect(() => {
        if (showLogin) {
            setEmail("");
        }
    }, [showLogin])

    return (
        <div className="flex w-58 gap-2 justify-between items-center relative">
            <div onClick={() => setShowQr(true)} className="dark:bg-darkBgHover xl:flex hidden justify-around cursor-pointer hover:bg-searchHover items-center w-28 px-3 py-2 rounded-3xl bg-search ">
                <QrCodeScannerOutlinedIcon />
                <p className="font-semibold text-sm">Get app</p>
            </div>
            <button onClick={openLogIn} className="py-2  font-semibold px-3 text-white rounded-3xl bg-brandBg hover:bg-brandBgHover">Log In</button>
            <div onClick={handleRightMenu} className="h-10 w-10 cursor-pointer rounded-full flex justify-center items-center dark:hover:bg-darkBgHover hover:bg-search" >
                <MoreHorizOutlinedIcon />
            </div>
            <div ref={menuRef}>
                {<SettingMenu open={showSettingMenu} />}
            </div>
            {showQr && <RedditQrClone setShowQr={setShowQr} />}

            {showLogin && createPortal(<LogIn />, document.getElementById("modal-portal"))}
            {showSignUp && createPortal(<SignUp email={email} handleSetEmail={handleSetEmail} />, document.getElementById("modal-portal"))}
            {showNextPage && createPortal(<SignUpNextPage email={email} />, document.getElementById("modal-portal"))}
        </div>
    )
}


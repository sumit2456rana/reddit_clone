import React, { useEffect, useRef, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import downArrow from '../../../assets/down_arrow.svg'
import SendIcon from '@mui/icons-material/Send';
import { useChat } from "../../Provider/ChatProvider";
function Chat() {
    const {closeChat, minimizeChat} = useChat();
    const [allChats, setAllChats] = useState([]);
    const [chats, setChats] = useState("");
    const myChatRef = useRef(null);
    const inputRef = useRef(null);
    function handleSendChat() {
        if (chats.length === 0) {
            return;
        }

        setAllChats([...allChats, chats]);
        setChats("");
        inputRef.current?.focus()
    }
    useEffect(() => {
        myChatRef.current?.scrollIntoView();
    }, [allChats]);
    return (
        <div className="dark:bg-darkBg z-50 dark:border-darkBorder dark:text-white w-[630px] h-[500px] rounded-t-2xl shadow-2xl border-r border-l border-t border-[#ccc] flex bg-white fixed bottom-0 right-6">
            <div className="w-1/3 border-r dark:border-darkBorder border-[#ccc] rounded-tl-2xl">
                <div className="p-3 border-b dark:border-darkBorder border-[#ccc]">
                    <h1 className="text-xl font-bold">Chats</h1>
                </div>
                <div className="flex items-center gap-3 px-2 py-2 bg-search dark:bg-darkBgHover cursor-pointer">
                    <img className="h-10 w-10 rounded-full" src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png" />
                    <p>Unknown</p>
                </div>
            </div>
            <div className="w-[67%] rounded-tr-2xl relative overflow-auto styled-scrollbars">
                <div className="fixed w-[420px] rounded-tr-2xl dark:bg-darkBg bg-white flex px-3 py-2 justify-between border-b dark:border-darkBorder border-[#ccc]">
                    <h1 className="text-lg font-semibold">Unknown</h1>
                    <div className="flex">
                        <div onClick={minimizeChat} className="dark:hover:bg-darkBgHover py-1 px-1.5 mr-2 cursor-pointer flex flex-col justify-center items-center rounded-full hover:bg-searchHover">
                            <img src={downArrow} className="dark:brightness-0 dark:invert-[1]" />
                        </div>

                        <div onClick={closeChat} className="p-1 dark:hover:bg-darkBgHover cursor-pointer flex flex-col justify-center items-center rounded-full hover:bg-searchHover">
                            <CloseIcon />
                        </div>
                    </div>
                </div>
                <div className="mt-16 mb-20">
                    <div className="flex flex-col justify-center items-center my-8">
                        <img className="h-10 w-10 rounded-full" src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png" />
                        <p>unknown</p>
                        <p className="text-xs">Redditor for 1027d  ·  1 karma</p>
                    </div>
                    <div className="overflow-auto flex flex-col justify-end min-h-[240px]">
                        {[...allChats].map((e, index) => (
                            <div key={index} className="px-3 py-2 hover:bg-searchHover dark:hover:bg-darkBgHover">
                                <div className="flex items-center gap-3">
                                    <img className="h-8 w-8 rounded-full" src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png" />
                                    <p className="font-semibold">unknown</p>
                                    <p className="text-xs text-[#7c7c7c]">{`${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getHours() >= 12 ? 'PM' : 'AM'}`}</p>
                                </div>
                                <p className="pl-11 text-xs">{e}</p>

                            </div>

                        ))}
                    </div>

                </div>

                <div ref={myChatRef} />
                <div className="fixed dark:bg-darkBg bottom-0 w-[420px] px-2 py-4 flex items-center bg-white">
                    <input onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSendChat();
                        }
                    }} ref={inputRef} value={chats} onChange={(e) => setChats(e.target.value)} className="bg-[#EAEDEE] dark:bg-inputDark px-4 py-3 outline-none rounded-3xl w-full mr-2" placeholder="Message" />
                    <div onClick={handleSendChat} className="p-3 dark:hover:bg-darkBgHover cursor-pointer flex flex-col justify-center items-center rounded-full hover:bg-searchHover">
                        <SendIcon />
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Chat;

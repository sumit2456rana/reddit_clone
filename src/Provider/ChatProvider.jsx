import { createContext, useContext, useState } from "react";
const ChatContext = createContext();
export function ChatProvider({children}) {
    const [isChatOpened , setIsChatOpened] = useState(false);
    const [isChatMinimized , setIsChatMinimized] = useState(false);

    function openChat() {
        setIsChatOpened(true);
        setIsChatMinimized(false);
    }
    function closeChat() {
        setIsChatOpened(false);
        setIsChatMinimized(false);
    }
    function minimizeChat() {
        setIsChatMinimized(true);
        // setIsChatOpened(false);
    }
    function closeMinimizeChat() {
        setIsChatMinimized(false);
        setIsChatOpened(false);
    }

    let obj = {
        isChatOpened,
        isChatMinimized,
        openChat,
        closeChat,
        minimizeChat,
        closeMinimizeChat
    }

    return <ChatContext.Provider value={obj}>{children}</ChatContext.Provider>
}

export function useChat() {
    return useContext(ChatContext);
}
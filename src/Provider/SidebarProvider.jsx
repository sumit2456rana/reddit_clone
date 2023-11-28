import { createContext, useContext, useState } from "react";
import { useUser } from "./UserProvider";
const SidebarContext = createContext();
export function SidebarProvider({children}) {
    const {isUserLoggedIn} = useUser();
    const [isSidebarOpen , setIsSidebarOpen] = useState(isUserLoggedIn ? false : true);

    function handleSidebar() {
        setIsSidebarOpen(prev => !prev);
    }

    let obj = {
        isSidebarOpen,
        handleSidebar,
    }

    return <SidebarContext.Provider value={obj}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
    return useContext(SidebarContext);
}
import { createContext, useContext, useEffect, useState } from "react";
const StatusAndThemeContext = createContext();
export function StatusAndThemeProvider({children}) {
    const [status , setStatus] = useState(JSON.parse(localStorage.getItem('Online Status')) !== null ? JSON.parse(localStorage.getItem('Online Status')) : true);
    const [darkTheme , setDarkTheme] = useState(JSON.parse(localStorage.getItem('Dark Theme')) !== null ? JSON.parse(localStorage.getItem('Dark Theme')) : false);

    function handleSetStatus(val) {
        setStatus(val);
        localStorage.setItem('Online Status' , val);
    }
    function handleSetTheme(val) {
        setDarkTheme(val);
        localStorage.setItem('Dark Theme' , val);
    }
    useEffect(() => {
        if(darkTheme) {
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
        }
    } , [darkTheme])
    let obj = {
        darkTheme,
        status,
        handleSetStatus,
        handleSetTheme,
    }
    
    return <StatusAndThemeContext.Provider value={obj}>{children}</StatusAndThemeContext.Provider>
}

export function useStatusAndTheme() {
    return useContext(StatusAndThemeContext);
}
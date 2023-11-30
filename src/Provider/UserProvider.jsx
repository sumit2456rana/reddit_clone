import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({children}) {
    const [authToken , setAuthToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [userData , setUserData] = useState(JSON.parse(sessionStorage.getItem('user')));

    const logIn = (data) => {
        setUserData(data);
        sessionStorage.setItem('user' , JSON.stringify(data));
    }
    const signUp = (data) => {
        setUserData(data);
        sessionStorage.setItem('user' , JSON.stringify(data));
    }
    const logout = () => {
        setUserData(null);
        setAuthToken(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userToken');

    }
    const handleAuthToken = (token) => {
        setAuthToken(token)
        sessionStorage.setItem('userToken' , JSON.stringify(token));
    }
    const isUserLoggedIn = userData;

    let obj = {
        isUserLoggedIn,
        userData,
        authToken,
        logIn,
        signUp,
        logout,
        handleAuthToken,
    }
    return <UserContext.Provider value={obj}>{children}</UserContext.Provider>
} 

export function useUser() {
    return useContext(UserContext);
}
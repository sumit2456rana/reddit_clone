import { createContext, useContext, useState } from "react";

const LoginOrSignUpContext = createContext();
export function LoginOrSignUp({children}) {
    const [showLogin , setShowLogin] = useState(false);
    const [showSignUp , setShowSignUp] = useState(false);
    const [showNextPage , setShowNextPage] = useState(false);
    function openSignUp() {
        setShowSignUp(true);
        setShowLogin(false);
    }
    function openLogIn() {
        if(showSignUp){
            setShowSignUp(false);
        }
        setShowLogin(true);
    }
    function closeLogIn() {
        setShowLogin(false);
    }
    function closeSignUp() {
        setShowSignUp(false);
        setShowLogin(false);
    }
    function handleShowNext() {
        setShowNextPage(true);
        setShowSignUp(false);
    }
    function backToSignUp() {
        setShowSignUp(true);
        setShowNextPage(false)
    }
    let obj = {
        showLogin,
        showSignUp,
        showNextPage,
        openLogIn,
        openSignUp,
        closeLogIn,
        closeSignUp,
        handleShowNext,
        backToSignUp,
    }
    return <LoginOrSignUpContext.Provider value={obj}>{children}</LoginOrSignUpContext.Provider>
}

export function useLogInOrSignUp() {
    return useContext(LoginOrSignUpContext);
}
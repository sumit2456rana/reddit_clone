import React, { useEffect, useState } from "react"
import CloseRounded from "@mui/icons-material/CloseRounded";
import ThemeButton from "./ThemeButton";
import { ContineWithGoogle, Or, Input } from "./FormComponents";
import { useLogInOrSignUp } from "../../Provider/LoginOrSignUp";
import { useUser } from "../../Provider/UserProvider";
import { useNavigate } from "react-router-dom";
function LogIn() {
    const { logIn, handleAuthToken, isUserLoggedIn } = useUser();
    const { closeLogIn, openSignUp } = useLogInOrSignUp();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    function handleOnChange(e) {
        const key = e.target.name;
        const val = e.target.value;
        setFormInput({
            ...formInput,
            [key]: val,
        })
    }
    async function logInHandler() {
        if (validateEmail(formInput.email))
            try {
                setIsLoading(true);
                const resp = await fetch("https://academics.newtonschool.co/api/v1/user/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'projectId': '3m8jkwvv8pjg',
                    },
                    body: JSON.stringify({
                        ...formInput,
                        appType: 'reddit',
                    })
                })
                const loginResp = await resp.json();
                if (resp.ok) {

                    logIn(loginResp.data);
                    handleAuthToken(loginResp.token);
                    console.log(isUserLoggedIn);
                    setError("");
                    closeLogIn();
                }
                else {
                    setError(loginResp.message);
                }
            }
            catch (err) {
                alert("Something went wrong!!");
            }
            finally {
                setIsLoading(false);
            }
        else setError("Enter a Valid Email!")
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    function onSubmit(e) {
        e.preventDefault();
        logInHandler();
    }
    return (
        <>
            <div className="modal">
                <form onSubmit={onSubmit} className="sm:w-[28rem] w-screen sm:h-auto h-screen sm:rounded-3xl rounded-none relative dark:bg-darkBg dark:text-white bg-white p-8 sm:px-14 px-8 ">
                    <div onClick={closeLogIn} className="absolute top-5 right-6 h-9 w-9 flex items-center justify-center rounded-full cursor-pointer dark:bg-darkBorder dark:hover:bg-darkBgHover bg-search hover:bg-searchHover">
                        <CloseRounded />
                    </div>
                    <h1 className="text-2xl font-bold mt-6">Log In</h1>
                    <p className="text-sm pt-3">By continuing, you agree to our <span className="text-blue-600 font-semibold cursor-pointer">User Agreement</span> and acknowledge that you understand the <span className="text-blue-600 font-semibold cursor-pointer">Privacy Policy</span>.</p>
                    {/* <ContineWithGoogle handleOnClick={loginWithGoogle} img={"https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png"} text="Google" /> */}
                    {/* <ContineWithGoogle img="https://pngfre.com/wp-content/uploads/apple-logo-6-1024x1024.png" text="Apple" /> */}

                    <Or />


                    <Input type={"email"} value={formInput.email} onChangeHanlder={handleOnChange} label={"Email"} />

                    <Input type={"password"} value={formInput.password} onChangeHanlder={handleOnChange} label={"Password"} />
                    <p className="text-red-700 font-semibold pl-3 text-sm">{error}</p>
                    <p className="mt-5">New to Reddit? <span onClick={openSignUp} className="text-blue-600 font-semibold cursor-pointer">Sign Up</span></p>

                    <ThemeButton isDisabled={formInput.email.length === 0 || formInput.password.length === 0} isLoading={isLoading}>Log In</ThemeButton>

                </form>
            </div>
        </>
    )
};


export default LogIn;

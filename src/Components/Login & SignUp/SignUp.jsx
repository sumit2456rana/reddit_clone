import React, { useState } from "react"
import CloseRounded from "@mui/icons-material/CloseRounded";
import { ContineWithGoogle, Or, Input } from "./FormComponents";
import ThemeButton from "./ThemeButton";
import { useLogInOrSignUp } from "../../Provider/LoginOrSignUp";

function SignUp({ email, handleSetEmail }) {
    const { openLogIn, closeSignUp, handleShowNext } = useLogInOrSignUp();

    const [error, setError] = useState("");
    function handleOnChange(e) {
        handleSetEmail(e.target.value);
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            console.log("Redirect User to next page!!!");
            handleShowNext();
            handleSetEmail(email);
        } else {
            setError("Enter a Valid Email!!");
        }
    }
    return (

        <div className="modal">
            <form onSubmit={handleOnSubmit} className="sm:w-[28rem] w-screen sm:h-auto h-screen sm:rounded-3xl rounded-none dark:bg-darkBg dark:text-white relative bg-white p-8 sm:px-14 px-8">
                <div onClick={closeSignUp} className="absolute dark:bg-darkBorder dark:hover:bg-darkBgHover top-5 right-6 h-9 w-9 flex items-center justify-center rounded-full cursor-pointer bg-search hover:bg-searchHover">
                    <CloseRounded />
                </div>
                <h1 className="text-2xl font-bold mt-6">Sign Up</h1>
                <p className="text-sm pt-3">By continuing, you agree to our <span className="text-blue-600 font-semibold cursor-pointer">User Agreement</span> and acknowledge that you understand the <span className="text-blue-600 font-semibold cursor-pointer">Privacy Policy</span>.</p>
                {/* <ContineWithGoogle img={"https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png"} text="Google" />
                <ContineWithGoogle img="https://pngfre.com/wp-content/uploads/apple-logo-6-1024x1024.png" text="Apple" /> */}

                <Or />


                <Input type={"email"} value={email} onChangeHanlder={handleOnChange} label={"Email"} />

                <p className="text-red-700 font-semibold pl-3 text-sm">{error}</p>
                <p className="mt-6 mb-[5.5rem]">Already a redditor? <span onClick={openLogIn} className="text-blue-600 font-semibold cursor-pointer">Log In</span></p>

                <ThemeButton isDisabled={email.length === 0}>Continue</ThemeButton>

            </form>
        </div>
    )
};


export default SignUp;

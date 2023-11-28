import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Input } from "./FormComponents";
import ThemeButton from "./ThemeButton";
import { useLogInOrSignUp } from '../../Provider/LoginOrSignUp';
import { useState } from 'react';
import { useUser } from '../../Provider/UserProvider';

export default function SignUpNextPage({email}) {
    const {backToSignUp , closeSignUp} = useLogInOrSignUp();
    const {signUp , handleAuthToken} = useUser();
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState("");
    const [formInput , setFormInput] = useState({
        name: "",
        password: "",
    })
    function handleOnChange(e) {    
        const key = e.target.name;
        const val = e.target.value;
        setFormInput({
            ...formInput,
            [key]: val,
        })
    }

    async function handleSignUp() {
        try {
            setIsLoading(true);
            const resp = await fetch("https://academics.newtonschool.co/api/v1/user/signup" , {
                method : "POST",
                headers : {
                    'Content-Type': 'application/json',
                    'projectId': '3m8jkwvv8pjg',
                },
                body: JSON.stringify({
                    'email': email,
                    ...formInput,
                    appType: 'reddit',
                })
            })
            const signUpResp = await resp.json();
            if(resp.ok){
                signUp(signUpResp.data.user)
                handleAuthToken(signUpResp.token)
                backToSignUp();
                closeSignUp();
            }else {
                setError(signUpResp.message);
            }
            console.log(signUpResp);
        } catch (err) {
            alert("Something went wrong!!");
        } finally { 
            setIsLoading(false);
        }
    }
    function handleOnSubmit(e) {
        e.preventDefault();
        handleSignUp();
    }
    return (
        <div className="modal">
            <form onSubmit={handleOnSubmit} className="dark:bg-darkBg dark:text-white sm:w-[28rem] w-screen sm:h-auto h-screen sm:rounded-3xl rounded-none relative bg-white p-8 sm:px-14 px-8">
                <div onClick={backToSignUp} className="absolute top-5 dark:bg-darkBorder dark:hover:bg-darkBgHover right-6 h-9 w-9 flex items-center justify-center rounded-full cursor-pointer bg-search hover:bg-searchHover">
                    <KeyboardBackspaceIcon />
                </div>
                <h1 className="text-2xl font-bold mt-6">Create your username and password</h1>
                <p className="text-sm py-4">Reddit is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.</p>

                <Input type={"text"} value={formInput.name} onChangeHanlder={handleOnChange}  label={"Username"} />
                <Input type={"password"} value={formInput.password} onChangeHanlder={handleOnChange}  label={"Password"} />

                <p className="text-red-700 font-semibold pl-3 mb-[11rem] text-sm">{error}</p>

                <ThemeButton isLoading={isLoading} isDisabled={formInput.name.length === 0 || formInput.password.length === 0}>Continue</ThemeButton>

            </form>
        </div>
    )
}
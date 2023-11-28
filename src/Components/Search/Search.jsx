import React, { useEffect, useRef, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchSuggestions from "./SearchSuggestions";
import { useUser } from "../../Provider/UserProvider";
import { useNavigate } from "react-router-dom";

function Search() {
    const [query, setQuery] = useState("");
    const inputRef = useRef();
    const sugesstionRef = useRef();
    const [showSuggestion, setShowSuggestion] = useState(false);
    const { isUserLoggedIn } = useUser();
    const navigate = useNavigate();
    const clearInput = () => {
        setQuery("");
        inputRef.current.focus();
    };

    const handleInputClick = () => {
        setShowSuggestion(true);
    };
    useEffect(() => {
        const handler = (e) => {
            if (!sugesstionRef.current?.contains(e.target)) {
                setShowSuggestion(false);
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [])
    function handleEnter(e) {
        if (query.length > 0)
            if (e.key === 'Enter') {
                navigate(`/search?q=${query}`)
                setShowSuggestion(false);
                setQuery('');
                inputRef.current.focus();

            }
    }
    return (
        <div className={`${isUserLoggedIn ? "w-[34%]" : "lg:w-[50%] w-[40%] sm:w-[60%]"}`}>
            <div onClick={handleInputClick} ref={sugesstionRef} className={`${showSuggestion ? 'bg-search py-[11.5px] rounded-b-none' : 'bg-search'} fixed my-2 top-0 hover:bg-searchHover dark:hover:bg-transparent dark:hover:border-white dark:border dark:border-darkBorder dark:bg-inputDark ${isUserLoggedIn ? 'w-[34%]' : 'lg:w-[50%] sm:w-[60%] w-[38%]'} px-3 py-2 flex items-center rounded-3xl`}>
                <SearchOutlinedIcon className="font-light" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Search Reddit"
                    className="bg-transparent  mx-2 border-0 outline-none w-full"
                    ref={inputRef}
                    onKeyDown={handleEnter}
                />
                <div
                    onClick={clearInput}
                    className={`flex justify-center h-6 w-7 cancel cursor-pointer rounded-full hover:bg-zinc-300 items-center ${query.length === 0 ? "hidden" : ""}`}
                >
                    <CancelOutlinedIcon />
                </div>
            </div>
            {showSuggestion && <div ref={sugesstionRef}><SearchSuggestions /></div>}
        </div>
    );
}

export default Search;

import React, { useState } from "react"
import { useSearchParams } from "react-router-dom";
import CommentSearches from '../Components/Search/CommentSearches';
import ChannelSearches from '../Components/Search/ChannelSearches';
import UserSearches from "../Components/Search/UserSearches";
import PostSearches from "../Components/Search/PostSearches";

function SearchPage() {
    const [searchParams] = useSearchParams();
    let query = searchParams.get("q");
    const [field, setField] = useState("post");

    return (
        <div className="pages dark:bg-[#030303] dark:text-white lg:px-20 px-4">
            <div className="max-w-[calc(1084px-160px)] flex justify-center mx-auto">
                <div className="flex flex-col w-full">
                    <div className="w-full flex mt-4 gap-2 flex-wrap">
                        <div onClick={() => setField("post")} className={`${field === "post" && "bg-white dark:bg-darkBorder"} dark:hover:bg-darkBgHover px-6 py-2 cursor-pointer rounded-3xl hover:bg-[#fff] font-semibold`}>
                            Posts
                        </div>
                        <div onClick={() => setField("comment")} className={`${field === "comment" && "bg-white dark:bg-darkBorder"} dark:hover:bg-darkBgHover px-6 py-2 cursor-pointer rounded-3xl hover:bg-[#fff] font-semibold`}>
                            Comments
                        </div>
                        <div onClick={() => setField("channel")} className={`${field === "channel" && "bg-white dark:bg-darkBorder"} dark:hover:bg-darkBgHover px-6 py-2 cursor-pointer rounded-3xl hover:bg-[#fff] font-semibold`}>
                            Communities
                        </div>
                        <div onClick={() => setField("user")} className={`${field === "user" && "bg-white dark:bg-darkBorder"} dark:hover:bg-darkBgHover px-6 py-2 cursor-pointer rounded-3xl hover:bg-[#fff] font-semibold`}>
                            People
                        </div>
                    </div>
                    {field === 'post' ? <PostSearches query={query} /> :
                        field === 'comment' ? <CommentSearches query={query} /> :
                            field === 'channel' ? <ChannelSearches query={query} /> :
                            <UserSearches query={query}/>
                    }
                </div>

            </div>
        </div>
    )
};

export default SearchPage;

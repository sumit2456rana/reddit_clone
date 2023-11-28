import React, { useState } from "react"
import upVoteIcon from "../../../assets/upvote_icon.svg";
import downVoteIcon from "../../../assets/downvote_icon.svg";
const Vote = ({likes , onvote}) => {
    const handleDownVote = (e) => {
        onvote('downvote');
        
        e.preventDefault();
    }
    const handleUpVote = (e) => {
        onvote('upvote')
        e.preventDefault();
    }
    return (
        <div className="w-10 rounded-l bg-[#f8f9fa] dark:bg-[#161617] px-2 flex flex-col gap-1 pt-2 items-center h-auto">
            <div onClick={handleUpVote} className="h-8 w-8 flex justify-center items-center hover:bg-[#ff4500] rounded-md cursor-pointer ">
                <img className="h-5 w-5 dark:brightness-0 dark:invert-[1]" src={upVoteIcon} />
            </div>
            <span className="text-sm font-bold dark:text-white">{likes}</span>
            <div onClick={handleDownVote} className="h-8 w-8 flex justify-center items-center hover:bg-blue-600 cursor-pointer rounded-md">
                <img className="h-5 w-5 dark:brightness-0 dark:invert-[1]" src={downVoteIcon} />
            </div>
        </div>
    )
}

export default Vote;

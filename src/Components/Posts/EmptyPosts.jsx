import React from "react"
import upVoteIcon from "../../../assets/upvote_icon.svg";
import downVoteIcon from "../../../assets/downvote_icon.svg";
function EmptyPosts({ name }) {
    let arr = new Array(10);
    arr.fill(0);
    return (
        <div className="my-4 relative flex flex-col items-center"> {/* Added flex classes */}
            {arr.map((e, i) => (
                <div key={i} className="bg-[#e6eaee] dark:bg-darkBg dark:border-darkBorder  border border-[#ccc] rounded h-auto py-2 w-full flex">
                    <div className="w-10 rounded-l dark:bg-darkBg bg-[#e6eaee] px-2 flex flex-col gap-1 pt-2 items-center h-auto">
                        <div className="h-8 w-8 flex justify-center items-center rounded-md opacity-[0.3]">
                            <img className="h-5 w-5" src={upVoteIcon} />
                        </div>
                        <div className="h-8 w-8 flex justify-center items-center rounded-md opacity-[0.3]">
                            <img className="h-5 w-5" src={downVoteIcon} />
                        </div>
                    </div>
                </div>
            ))}
            <div className="absolute top-80 text-center mt-4">
                <p className="text-2xl dark:text-white font-semibold">hmm... {name} hasn't posted anything</p>
            </div>
        </div>
    );
}


export default EmptyPosts;

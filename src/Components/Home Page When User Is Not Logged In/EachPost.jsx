import { useState } from "react";
import commentIcon from "../../../assets/comment_icon.svg"
import shareIcon from "../../../assets/share_icon.svg"
import { useUser } from "../../Provider/UserProvider";
import ChannelOverview from "../Home Page When User Is Logged In/ChannelOverview";

function EachPost({postData}) {
    const {commentCount, content , likeCount} = postData;
    const {image , name } = postData.channel;
    const authorName = postData.author.name; 
    const {logout} = useUser();
    const [showChannelOverview , setShowChannelOverview] = useState(false);
    return (
        <div className="hover:bg-[#EAEDEF] dark:hover:bg-darkBgHover p-4 md:rounded-2xl">
            <div className="flex justify-between"> 
                {/* Profile Image */}
                <div className="flex gap-2 items-center relative">
                    <img className="w-6 h-6 rounded-full" src={image} />
                    <span onMouseOver={() => setShowChannelOverview(true)}
                    onMouseOut={() => setShowChannelOverview(false)}
                    className="hover:text-blue-600 cursor-pointer">r/{name}
                    {showChannelOverview && <ChannelOverview image={image} channelName={name} top={'6'} channelId={postData.channel._id} />}
                    </span>
                </div>
                {/* Join Button */}
                <div>
                    <button onClick={logout} className="px-3 py-[2px] font-bold bg-[#0045AC] text-sm text-white rounded-2xl hover:bg-[#003584]">Join</button>
                </div>
            </div>
            <div className="py-4 text-sm md:text-base">
                {/* content */}
                <p>{content}</p>
            </div>
            <div className="flex gap-3">
                {/* Like */}
                {/* Unlike */}
                <div className="flex items-center gap-1 w-auto py-0 bg-[#0000000d] rounded-3xl">
                    <span className="hover:bg-[#cccccc]  flex justify-center items-center h-8 w-8 rounded-full">
                        <svg rpl="" fill="currentColor" className="hover:fill-red-600" height="16" icon-name="upvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8ZM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016Z"></path></svg>
                    </span>
                    <span className=" text-sm font-semibold">{likeCount}</span>
                    <span className="hover:bg-[#cccccc]  flex justify-center items-center h-8 w-8 rounded-full">
                        <svg rpl="" fill="currentColor" className="hover:fill-blue-600" height="16" width="16" icon-name="downvote-outline" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 20a1.122 1.122 0 0 1-.834-.372l-7.872-8.581A1.251 1.251 0 0 1 1.118 9.7 1.114 1.114 0 0 1 2.123 9H6V2.123A1.125 1.125 0 0 1 7.123 1h5.754A1.125 1.125 0 0 1 14 2.123V9h3.874a1.114 1.114 0 0 1 1.007.7 1.25 1.25 0 0 1-.171 1.345l-7.876 8.589A1.128 1.128 0 0 1 10 20Zm-7.684-9.75L10 18.69l7.741-8.44H12.75v-8h-5.5v8H2.316Zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013Z"></path></svg>
                    </span>
                </div>

                {/* Comment */}
                <div className="flex gap-2 text-sm font-semibold items-center px-3 rounded-3xl bg-[#0000000d] dark:hover:bg-iconsDark hover:bg-[#cccccc]">
                    <img className="dark:brightness-0 dark:invert-[1]" src={commentIcon} />
                    <span>{commentCount}</span>
                </div>
                {/* Share */}
                <div className="flex text-sm font-semibold gap-2 items-center px-3 rounded-3xl bg-[#0000000d] dark:hover:bg-iconsDark hover:bg-[#cccccc]">
                    <img className="dark:brightness-0 dark:invert-[1]" src={shareIcon} />
                    <span>Share</span>
                </div>
            </div>
        </div>
    )
}

export default EachPost;
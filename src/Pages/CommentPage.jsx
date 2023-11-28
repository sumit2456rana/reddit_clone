import React, { useEffect, useRef, useState } from "react"
import { CloseRounded } from "@mui/icons-material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Vote from "../Components/Posts/Vote";
import Comment from "../Components/Comments/Comment";
import { useUser } from "../Provider/UserProvider";
import cake_slice from "../../assets/cake_slice.svg";
import timeAgo from "../Components/Formatted Date/timeAgo";
import BackToTopBtn from "../Components/Home Page When User Is Logged In/BackToTopBtn";
import CommentBox from "../Components/Comments/CommentBox";
import AllComments from "../Components/Comments/AllComments";
import { usePopup } from "../Provider/PopUpProvider";
function CommentPage() {
  const { authToken } = useUser();
  const param = useParams();
  const postId = param.id;
  const { addToPopUp } = usePopup();
  const [postData, setPostData] = useState({});
  async function getInfoOfPost() {
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}`, {
      headers: {
        projectId: "3m8jkwvv8pjg",
        'Content-Type': 'application/json',
      }
    })
    const jsonData = await resp.json();
    setPostData(jsonData.data);
  }
  const handleVote = async (postId, type) => {
    try {
      const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`, {
        method: type === 'downvote' ? 'DELETE' : 'POST',
        headers: {
          projectId: '3m8jkwvv8pjg',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const data = await resp.json();
      if (resp.ok) {
        
        getInfoOfPost();
        addToPopUp({ message: data.message, emotion: 'happy' });
      } else {
        if (data.message === 'You already liked this post') {
          addToPopUp({ message: data.message, emotion: 'happy' })
        } else {
          addToPopUp({ message: data.message, emotion: 'sad' })
        }
      }

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getInfoOfPost();
  }, [])
  return (
    <div className="pages dark:bg-darkBg lg:px-20 px-0">
      <CommentsHeader likes={postData?.likeCount} onvote={type => handleVote(postId, type)} />
      <div className="py-8 lg:px-20 px-2 flex">
        <PostDetials postData={postData} handleVote={handleVote} />
        <div className="lg:block hidden">
          <AboutChannel channelId={postData?.channel?._id} />
          <BackToTopBtn />
        </div>
      </div>
    </div>
  )
};
function CommentsHeader({ likes, onvote }) {
  const navigate = useNavigate();
  const handleDownVote = (e) => {
    onvote('downvote');
  }
  const handleUpVote = (e) => {
    onvote('upvote')

  }
  return (
    <div className="w-full h-12 sticky top-14 bg-black flex justify-between lg:px-20 px-5 z-10">
      {/* Upvote DownVote */}
      <div className="text-white flex items-center gap-2">
        <span className="text-[#878a8c]">|</span><svg onClick={handleUpVote} rpl="" className="cursor-pointer hover:stroke-red-700" fill="currentColor" height="20" icon-name="upvote-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8ZM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016Z"></path></svg>
        <span>{likes}</span>
        <svg onClick={handleDownVote} rpl="" className="cursor-pointer hover:stroke-blue-700" fill="currentColor" height="20" icon-name="downvote-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 20a1.122 1.122 0 0 1-.834-.372l-7.872-8.581A1.251 1.251 0 0 1 1.118 9.7 1.114 1.114 0 0 1 2.123 9H6V2.123A1.125 1.125 0 0 1 7.123 1h5.754A1.125 1.125 0 0 1 14 2.123V9h3.874a1.114 1.114 0 0 1 1.007.7 1.25 1.25 0 0 1-.171 1.345l-7.876 8.589A1.128 1.128 0 0 1 10 20Zm-7.684-9.75L10 18.69l7.741-8.44H12.75v-8h-5.5v8H2.316Zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013Z"></path></svg><span className="text-[#878a8c]">|</span>
      </div>
      {/* Close */}
      <div onClick={() => navigate(-1)} className="text-white flex items-center gap-1 cursor-pointer">
        <CloseRounded />
        <span>Close</span>
      </div>
    </div>
  )
}

function PostDetials({ postData, handleVote }) {
  const channelName = postData.channel?.name;
  const authorName = postData.author?.name;
  const content = postData.content;
  const likeCount = postData.likeCount;
  const commentCount = postData.commentCount;
  const image = postData.channel?.image;
  const postId = postData._id;
  const channelId = postData.channel?._id;
  const authorId = postData.author?._id;
  return (
    <div className="bg-white dark:bg-darkBg dark:border-darkBorder dark:text-white border border-[#ccc] rounded h-auto w-full flex">
      <Vote likes={likeCount} onvote={type => handleVote(postId, type)} />
      <div className="py-2 px-2 relative">
        <div className="flex gap-2 items-center">
          <img className="h-6 w-6 rounded-full" src={image} />
          <span className="hover:underline text-xs cursor-pointer font-bold">
            <NavLink to={`/r/${channelName}/${channelId}`}>r/{channelName}</NavLink>
          </span>
          <span>&bull;</span>
          <span className="lg:text-xs text-[10px] font-medium dark:text-iconsDark text-[rgba(0,0,0,0.6)]">Posted by&nbsp;
            <span className="cursor-pointer hover:underline">
              <NavLink to={`/user/${authorName}/${authorId}`}>u/{authorName}</NavLink>
            </span>
          </span>
          <span>&bull;</span>
          <span className="text-[rgba(0,0,0,0.6)] dark:text-iconsDark text-xs">2 weeks ago</span>
        </div>

        <div className="py-4 font-semibold lg:text-base text-sm">
          <p>{content}</p>
        </div>

        <Comment commentCount={commentCount} pathName={window.location.pathname} />
        {/* <CommentBox postId={postId} /> */}
        <AllComments postId={postId} />
      </div>
    </div>
  )
}

function AboutChannel({ channelId }) {
  const [channelInfo, setChannelInfo] = useState({});

  async function fetchChannelInfo() {
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${channelId}`, {
      headers: {
        projectId: "3m8jkwvv8pjg",
        'Content-Type': 'application/json',
      }
    })
    const jsonData = await resp.json();
    setChannelInfo(jsonData.data);
  }
  useEffect(() => {
    fetchChannelInfo();
  }, [channelId])
  const formattedDate = timeAgo(channelInfo?.createdAt);
  return (
    <div className="w-[300px] dark:bg-darkBg dark:border-darkBorder dark:text-white border border-[#cccccc] rounded ml-3 mb-36 h-fit bg-white ">
      <div className="bg-[#0079D3] w-full h-9 rounded-t"></div>
      <div className="p-3">
        <div className="flex items-center font-semibold gap-4">
          <img className="h-14 w-14 rounded-full" src={channelInfo?.image} />
          <p>r/{channelInfo?.name}</p>
        </div>
        <p className="pt-2 text-sm">
          {channelInfo?.description}
        </p>

        <div className="flex gap-2 text-[#7C7C7C] items-center my-4">
          <img className="h-5 w-5" src={cake_slice} />
          <span>Created at {formattedDate}</span>
        </div>

        <hr className="dark:border-darkBorder" />

        <div className="my-4 flex gap-7">
          <div>
            <h1 className="font-semibold text-lg">{(Math.random() * 100).toFixed(1)}k</h1>
            <p className="text-[#7C7C7C] text-xs ">Members</p>
          </div>
          <div>
            <h1 className="font-semibold text-lg"><span className="h-2 w-2 rounded-full inline-block bg-[#46d160]"></span> {(Math.random() * 10).toFixed(1)}k</h1>
            <p className="text-[#7C7C7C] text-xs">Online</p>
          </div>
          <div>
            <h1 className="font-semibold text-lg">{(Math.random() * 10).toFixed(1)}k</h1>
            <p className="text-[#7C7C7C] text-xs">Ranked by Size</p>
          </div>
        </div>

        <hr className="dark:border-darkBorder" />

        <button className="py-1 w-full dark:bg-darkBtn dark:text-black bg-[#0079D3] rounded-3xl text-white font-semibold mt-4">Join</button>
      </div>
    </div>
  )
}
export default CommentPage;

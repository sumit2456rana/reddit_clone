import React, { useEffect, useState } from "react"
import Vote from "./Vote";
import Comment from "../Comments/Comment";
import AuthorOverview from "../Home Page When User Is Logged In/AuthorOverview";
import { NavLink, useParams } from "react-router-dom";
import { useUser } from "../../Provider/UserProvider";
import { usePopup } from "../../Provider/PopUpProvider";
function ChannelPost({ data, view }) {
    // console.log(data);
    const param = useParams();
    const {authToken} = useUser();
    const {addToPopUp} = usePopup();
    const [showAuthorData, setShowAuthorData] = useState(false);
    const [authorData, setAuthorData] = useState(false);
    const [postData, setPostData] = useState({});
    const postId = data._id;
    const authorId = data?.author;
    const image = data?.images;
    const fetchPostData = async () => {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}`, {
            headers: {
                projectId: '3m8jkwvv8pjg',
                'Content-Type': 'application/json',
            }
        })

        const jsonData = await resp.json();
        
        setPostData(jsonData.data);
        // console.log(postData);
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
            if(resp.ok) {
                addToPopUp({ message: data.message, emotion: 'happy' })
                console.log(data);
                console.log(addToPopUp);
            }else{
                if (data.message === 'You already liked this post') {
                    addToPopUp({ message: data.message, emotion: 'happy' })
                } else {
                    addToPopUp({ message: data.message, emotion: 'sad' })
                }
            }
            fetchPostData();
        } catch (err) {
            console.log(err);
        }
    };
    const fetchAuthor = async () => {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${authorId}`, {
            headers: {
                projectId: '3m8jkwvv8pjg',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authToken}`
            }
        })

        const jsonData = await resp.json();
        
        setAuthorData(jsonData.data);
        // console.log(postData);
    }
    useEffect(() => {
        fetchPostData();
        fetchAuthor();
        console.log(authorData);
    }, [postId])
    
    return (
        <NavLink to={`/r/${authorData?.name}/comments/${postId}`} className="bg-white dark:border-darkBorder dark:hover:border-white dark:bg-darkBg dark:text-white border border-[#ccc] rounded h-auto my-4 w-full flex">
            <Vote likes={postData?.likeCount === undefined ? 0 : postData.likeCount} onvote={type => handleVote(postData._id, type)} />
            <div className="py-2 px-2 relative">
                {param.user ? <p className="text-xs">75 days ago</p> :<div className="flex gap-2 items-center">
                    <span className="text-xs font-medium dark:text-iconsDark text-[rgba(0,0,0,0.6)]">Posted by <span
                        onMouseOver={() => setShowAuthorData(true)}
                        onMouseOut={() => setShowAuthorData(false)}
                        className="cursor-pointer hover:underline">
                            
                            <NavLink to={`/user/${authorData?.name}/${authorId}`}>u/{authorData?.name}</NavLink>
                        {showAuthorData && <AuthorOverview authorName={authorData?.name} authorId={authorId} />}
                    </span></span>
                </div>}
                {data.title && <h1 className="text-xl font-semibold pt-2">{data.title}</h1>}
                <div className={`${view === 'classic' && "flex gap-4 items-start py-3"}`}>
                    {image !== null && <img className={`${view === 'card' ? "max-h-[420px] mt-3" : 'w-28 h-28 rounded-md'}`} src={image[0]} />}
                    <p className={`${view === 'card' && 'py-2'}`}>{data.content}</p>
                </div>
                <Comment commentCount={postData?.commentCount === undefined ? 0 : postData.commentCount} pathName={`/r/${authorData?.name}/comments/${postId}`} />
            </div>
        </NavLink>
    )
};  

export default ChannelPost;

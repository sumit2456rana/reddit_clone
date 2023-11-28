import React, { useEffect, useState } from "react"
import PostTags from "../Components/Posts/PostTags";
import EmptyPosts from "../Components/Posts/EmptyPosts";
import { useUser } from "../Provider/UserProvider";
import BackToTopBtn from "../Components/Home Page When User Is Logged In/BackToTopBtn";
import { useNavigate } from "react-router-dom";
import timeAgo from "../Components/Formatted Date/timeAgo";
import shareIcon from '../../assets/share_icon.svg';
import commentIcon from '../../assets/comment_icon.svg';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BlockIcon from '@mui/icons-material/Block';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { usePopup } from "../Provider/PopUpProvider";
const avatars = [
    'https://i.redd.it/snoovatar/avatars/78c4bb70-2728-44fd-839c-f22ddd3e3095.png',
    'https://i.redd.it/snoovatar/avatars/f40e4f37-7d10-445a-a862-e64a1a411d0b.png',
    'https://i.redd.it/snoovatar/avatars/16f0f3e7-65dd-4dbf-ba8e-fb7d15245253.png',
    'https://i.redd.it/snoovatar/avatars/4bea0aa5-a7b1-4a43-848d-2d771d0dfd8b.png',
    'https://i.redd.it/snoovatar/avatars/b988f68e-4eae-4b35-9a65-9247c673c311.png',
    'https://i.redd.it/snoovatar/avatars/b87e0377-9011-4fcf-87a4-a9108c003423.png',
    'https://i.redd.it/snoovatar/avatars/fbc519e4-0262-442c-8bed-8f88b00b6700.png',
    'https://i.redd.it/snoovatar/avatars/169c36ac-5ab1-42ad-8e03-faa4e379a3f3.png',
    'https://i.redd.it/snoovatar/avatars/a176aaeb-34a9-42e6-893d-f4dceae46c2d.png',
    'https://i.redd.it/snoovatar/avatars/basic/10a8e875-f403-43c6-ab75-655e72b0f5de.png',
    'https://i.redd.it/snoovatar/avatars/9754898f-8cb9-4c05-b37e-de7c52e51917.png'
]
function UserProfile() {
    const [userPosts, setUserPosts] = useState([]);
    const [view, setView] = useState('');
    const { userData, authToken } = useUser();
    function handleSelectedView(val) {
        setView(val);
    }
    async function fetchUserPosts() {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${userData._id}/posts`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                projectId: '3m8jkwvv8pjg',
                'Content-Type': 'application/json',
            }
        })
        const jsonResp = await resp.json();
        console.log(jsonResp);
        setUserPosts(jsonResp.data);
    }
    useEffect(() => {
        fetchUserPosts();
        console.log(userPosts);
    }, [])
    return (
        <div className="pages px-0 dark:bg-[#030303]">
            <div className="w-full h-10 bg-white border-b dark:bg-darkBg dark:border-darkBorder border-[#ccc]">
                <div className={`flex items-end max-w-[984px] h-full pl-6 pr-4 ${view == 'card' ? 'mx-auto' : 'mx-0'} my-0`}>
                    <p className="border-b-[3px] cursor-pointer border-[#33a8ff] pb-1 px-3 uppercase font-semibold text-[#33a8ff]">Overview</p>
                </div>
            </div>
            <div className="w-full flex justify-center mx-auto my-0 lg:px-6 px-2 py-4">
                <div className={`${view === 'card' ? 'lg:w-[640px]' : 'lg:w-full'} w-full`}>
                    <PostTags handleSelectedView={handleSelectedView} />
                    {userPosts.length === 0 ? <EmptyPosts name={userData.name} /> : (
                        userPosts?.map((e, i) => (
                            <div className="bg-white border border-[#ccc] rounded h-auto my-4 w-full">

                                <Content fetchUserPosts={fetchUserPosts} title={e.title} content={e.content} image={e.images[0]} view={view} createdAt={e.createdAt} postId={e._id} />
                            </div>
                        )))
                    }
                    {userPosts.length !== 0 && <p className="text-center my-5 uppercase font-semibold">
                        Yay! You are all set
                    </p>}
                </div>
                <div className="hidden md:block">
                    <UserDetails name={userData.name} />
                    <BackToTopBtn />
                </div>
            </div>
        </div>
    )
};
function UserDetails({ name }) {
    const [imgIdx, setImgIdx] = useState(0);
    const navigate = useNavigate();
    return (
        <div className="w-[310px] dark:border-darkBorder relative p-3 border border-[#cccccc] rounded ml-6 mb-6 h-auto dark:bg-darkBg dark:text-white bg-white">
            <div className="h-24 mt-[-12px] mx-[-12px] bg-[#33a8ff] rounded-t"></div>
            <div className="h-36 w-36 mt-[-40px] flex justify-center items-center mx-auto">
                <img src={avatars[imgIdx]} />
            </div>
            <div className="mt-9 text-center">
                <h1 className="text-2xl font-semibold">{name}</h1>
                <p className="text-[#7c7c7c] text-sm font-medium pt-1">u/{name}</p>
            </div>
            <button onClick={() => setImgIdx(Math.round(Math.random() * 10))} className="w-full py-1.5 rounded-3xl my-3 font-bold styleAvtar text-white">Style Avtar</button>
            <div className="my-2 flex gap-20 text-sm font-semibold">
                <div>
                    <p>Karma</p>
                    <i className="fa-solid fa-meteor fa-rotate-270 text-[#33a8ff] mr-1 text-xs"></i>
                    <span className="text-xs text-[#7c7c7c]">{Math.round(Math.random() * 1000)}</span>
                </div>
                <div className="mr-4">
                    <p>Cake Day</p>
                    <i className="fa-solid fa-cake-candles  text-[#33a8ff] mr-1 text-xs"></i>
                    <span className="text-xs text-[#7c7c7c]">August 20, 2023</span>
                </div>
            </div>
            <button onClick={() => navigate('/submit')} className="w-full dark:text-black dark:bg-darkBtn py-1 font-semibold bg-[#0079D3] rounded-2xl my-2 text-white hover:bg-[rgba(0,121,211,0.9)]">New Post</button>

        </div>
    )
}
function Content({ title, content, image, view, createdAt, postId, fetchUserPosts }) {
    let formattedTime = timeAgo(createdAt)
    const { addToPopUp } = usePopup();
    const { authToken } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content)
    async function removePost() {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                projectId: '3m8jkwvv8pjg',
            }
        })
        if (resp.ok) {
            fetchUserPosts();
            addToPopUp({ message: 'Post removed successfully', emotion: 'happy' });
        }

    }
    async function editPost() {
        const formData = new FormData();
        formData.append('title', editedTitle);
        formData.append('content', editedContent);
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${authToken}`,
                projectId: '3m8jkwvv8pjg',
            },
            body: formData
        })
        const jsonResp = await resp.json();
        console.log(jsonResp);
        if (resp.ok) {
            fetchUserPosts();
            setIsEditing(false);
            addToPopUp({message: 'Post successfully edited' , emotion: 'happy'});
        }

    }
    return (
        <div className="py-2 px-2 relative dark:bg-darkBg dark:text-white">
            <p className="text-sm font-semibold">{formattedTime}</p>
            {title && isEditing ? <textarea className="border dark:bg-inputDark mt-4 border-[#ccc] rounded py-2 px-4 w-full" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}></textarea> : <h1 className="text-xl font-semibold pt-2">{title}</h1>}
            <div className={`${view === 'classic' && "flex gap-4 items-start py-3"}`}>
                {image && <img className={`${view === 'card' ? "max-h-[420px] mt-3" : 'w-28 h-28 rounded-md'}`} src={image} />}
                {isEditing ? <textarea className="border border-[#ccc] dark:bg-inputDark rounded py-2 px-4 min-h-[100px] w-full" value={editedContent} onChange={(e) => setEditedContent(e.target.value)}></textarea> : <p className={`${view === 'card' && 'py-2'}`}>{content}</p>}
            </div>
            <div className="flex gap-3 text-sm">

                {isEditing ? (
                    <div onClick={editPost} className="px-3 py-1 cursor-pointer text-[#878A8C] font-bold flex gap-2 dark:hover:bg-darkBgHover hover:bg-search">
                        <span className="text-xs"><SaveAltIcon /></span>
                        <span>Save</span>
                    </div>
                ) : (
                    <div onClick={() => setIsEditing(true)} className="px-3 py-1 cursor-pointer text-[#878A8C] font-bold flex gap-2 dark:hover:bg-darkBgHover hover:bg-search">
                        <span className="text-xs"><EditOutlinedIcon /></span>
                        <span>Edit</span>
                    </div>
                )}
                <div onClick={removePost} className="px-3 py-1 cursor-pointer text-[#878A8C] font-bold flex gap-2 dark:hover:bg-darkBgHover hover:bg-search">
                    <span className="text-xs"><BlockIcon /></span>
                    <span>Remove</span>
                </div>
                <div className="px-3 py-1 text-[#878A8C] cursor-pointer font-bold flex gap-2 dark:hover:bg-darkBgHover hover:bg-search">
                    <img src={shareIcon} className="dark:brightness-0 dark:invert-[1]" />
                    <span>Share</span>
                </div>
            </div>
        </div>
    )
}
export default UserProfile;

import React, { useEffect, useState } from "react"
import PostTags from "../Components/Posts/PostTags";
import BackToTopBtn from "../Components/Home Page When User Is Logged In/BackToTopBtn";
import { useParams } from "react-router-dom";
import { useUser } from '../Provider/UserProvider';
import ChannelPost from '../Components/Posts/ChannelPost';
import EmptyPosts from "../Components/Posts/EmptyPosts";
import Spinner from '../Components/Loader/Spinner'
import { usePopup } from "../Provider/PopUpProvider";
function UserPage() {
    let { id } = useParams();
    const { authToken } = useUser();
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [view, setView] = useState('');
    function handleSelectedView(val) {
        setView(val);
    }
    async function fetchUser() {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                projectId: '3m8jkwvv8pjg',
                'Content-Type': 'application/json',
            }
        })
        const jsonResp = await resp.json();
        // console.log(jsonResp);
        setUser(jsonResp.data);
    }
    async function fetchUserPosts() {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${id}/posts`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                projectId: '3m8jkwvv8pjg',
                'Content-Type': 'application/json',
            }
        })
        const jsonResp = await resp.json();
        // console.log(jsonResp);
        setUserPosts(jsonResp.data);
    }
    useEffect(() => {
        fetchUser();
        fetchUserPosts();
    }, [])
    return (
        <div className="pages px-0 dark:bg-[#030303]">
            {/* Header */}
            <div className="w-full h-10 dark:bg-darkBg dark:border-darkBorder bg-white border-b border-[#ccc]">
                <div className={`flex items-end max-w-[984px] h-full pl-6 pr-4 ${view == 'card' ? 'mx-auto' : 'mx-0'} my-0`}>
                    <p className="border-b-[3px] cursor-pointer border-[#33a8ff] pb-1 px-3 uppercase font-semibold text-[#33a8ff]">Overview</p>
                </div>
            </div>
            <div className="max-w-full flex justify-center mx-auto my-0 lg:px-6 py-4 px-2">
                <div className={`${view === 'card' ? 'lg:w-[640px]' : 'lg:w-full'}`}>
                    <PostTags handleSelectedView={handleSelectedView} />
                    {userPosts.length === 0 ? <EmptyPosts name={`u/${user.name}`} /> : (
                        userPosts?.map((e, i) => (
                            <ChannelPost key={i} data={e} view={view} />
                        )))
                    }
                    {userPosts.length !== 0 && <p className="text-center text-iconsDark my-5 uppercase font-semibold">
                        Yay! You are all set
                    </p>}
                </div>
                <div className="hidden md:block">
                    <AboutUser authorName={user.name} userId={id} image={user.profileImage} isFollowed={user.isFollowed} fetchUser={fetchUser} />
                    <TrophyCase />
                    <BackToTopBtn />
                </div>
            </div>
        </div>
    )
};

function AboutUser({ authorName, image, isFollowed, userId, fetchUser }) {
    const { authToken } = useUser();
    const [isLoading , setIsLoading] = useState(false);
    const {addToPopUp} = usePopup();
    async function handleFollow() {
        try {
            setIsLoading(true);
            const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/follow/${userId}`, {
                method: isFollowed ? 'DELETE' : 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'projectID': '3m8jkwvv8pjg'
                }
            })
            const jsonResp = await resp.json();
            if(isFollowed) {
                addToPopUp({message: 'User unfollowed successfully' , emotion: 'sad'});
            }else{
                addToPopUp({message: jsonResp.message, emotion: 'happy'});
            }
            fetchUser();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <div className="w-[275px] dark:bg-darkBg dark:text-white dark:border-darkBorder relative p-3 border border-[#cccccc] rounded ml-6 mb-6 h-auto bg-white">
            <div className="h-24 mt-[-12px] mx-[-12px] bg-[#33a8ff] rounded-t"></div>
            <div className="border-4 rounded-md border-white h-20 w-20 mt-[-4rem] bg-inherit">
                <img className="rounded-md bg-transparent" src={image ? image : 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png'} />
            </div>
            <p className="text-xs font-semibold">u/{authorName}</p>
            <div className="my-4 flex justify-between text-sm font-semibold">
                <div>
                    <p>Karma</p>
                    <i className="fa-solid fa-meteor fa-rotate-270 text-[#33a8ff] mr-1 text-xs"></i>
                    <span className="text-xs text-[#7c7c7c]">{Math.round(Math.random() * 1000)}</span>
                </div>
                <div className="mr-4">
                    <p>Cake Day</p>
                    <i className="fa-solid fa-cake-candles text-[#33a8ff] mr-1 text-xs"></i>
                    <span className="text-xs text-[#7c7c7c]">August 20, 2023</span>
                </div>
            </div>
            <button onClick={handleFollow} disabled={isLoading} className="disabled:bg-[#ccc] flex justify-center items-center w-full py-1 font-semibold h-8 dark:bg-darkBtn dark:text-black bg-[#0079D3] rounded-2xl mb-2 text-white hover:bg-[rgba(0,121,211,0.9)]">{isLoading ? <Spinner /> : isFollowed ? 'Unfollow' : 'Follow'}</button>
        </div> 
    )
}
function TrophyCase() {
    return (
        <div className="w-[275px] relative p-3 border dark:bg-darkBg dark:border-darkBorder dark:text-white border-[#cccccc] rounded ml-6 mb-40 h-auto bg-white">
            <h1 className="font-bold text-sm">Trophy Case (1)</h1>
            <div className="flex mt-6 gap-2">
                <img src="https://www.redditstatic.com/awards2/verified_email-40.png" />
                <p className="text-sm font-semibold">Verified Email</p>
            </div>
        </div>
    )
}
export default React.memo(UserPage);

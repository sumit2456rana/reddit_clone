import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import CreatePostTab from '../Components/Create Post/CreatePostTab';
import PostTags from "../Components/Posts/PostTags";
import cake_slice from "../../assets/cake_slice.svg";
import rIcon from "../../assets/r_icon.svg";
import BackToTopBtn from "../Components/Home Page When User Is Logged In/BackToTopBtn";
import ChannelPost from '../Components/Posts/ChannelPost';
import timeAgo from "../Components/Formatted Date/timeAgo";
import EmptyPosts from '../Components/Posts/EmptyPosts';
import { useUser } from "../Provider/UserProvider";
function CommunitiyPage() {
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState('');
  const { id } = useParams();
  const {userData} = useUser();
  function handleSelectedView(val) {
    setView(val);
  }
  const fetchData = async () => {
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${id}`, {
      headers: {
        projectId: '3m8jkwvv8pjg',
        'Content-Type': 'application/json',
      }
    })
    const jsonResp = await resp.json();
    
    setData(jsonResp.data);
    
  }
  const fetchPost = async () => {
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${id}/posts`, {
      headers: {
        projectId: '3m8jkwvv8pjg',
        'Content-Type': 'application/json',
      }
    })
    const jsonResp = await resp.json();
    console.log(jsonResp);
    setPosts(jsonResp.data);
  }
  useEffect(() => {
    fetchData();
    fetchPost();
  }, [id])
  return (
    <div className="pages px-0 dark:bg-[#030303]">
      <CommunityHeading name={data.name} image={data.image} view={view} />
      <div className="max-w-full flex justify-center mx-auto my-0 lg:px-6 py-4 px-2">
        <div className={`${view === 'card' ? 'lg:w-[640px]' : 'lg:w-full'}`}>
          <CreatePostTab />
          <PostTags handleSelectedView={handleSelectedView} />
          {
            posts.length === 0 ? <EmptyPosts name={`r/${data.name}`} /> : posts.map((e, i) => (
              <ChannelPost key={i} data={e} view={view} />
            ))
          }
          {posts.length !== 0 && <p className="text-center text-iconsDark my-5 uppercase font-semibold">
            Yay! You are all set
          </p>}
        </div>
        <div className="hidden md:block">
          <AboutCommunity date={data.createdAt} desc={data.description} isUserCommunity={data.owner?._id === userData._id} />
          <BackToTopBtn />
        </div>
      </div>
    </div>
  )
};
function AboutCommunity({ desc, date, isUserCommunity }) {
  const navigate = useNavigate();
  const formattedDate = timeAgo(date);
  const [isAddDesc , setIsAddDesc] = useState(false);
  const [description , setDescription] = useState(desc);

  function handleSaveBtn() {
    
  }
  return (
    <div className="w-[275px] dark:border-darkBorder p-3 border dark:bg-darkBg dark:text-white border-[#cccccc] rounded ml-6 mb-12 h-auto bg-white ">
      <h1 className="font-semibold">About Community</h1>
      {isUserCommunity && (
        <div className="mt-4 dark:bg-darkBg dark:border-darkBorder bg-[#F6F7F8] mb-4 w-full border border-[#ccc] rounded hover:border-[#0079D3]">
          {isAddDesc ? <div>
            <textarea placeholder="Tell us about your community" value={description} onChange={(e) => setDescription(e.target.value)} rows={1} className="resize-none p-2 min-h-3 bg-transparent outline-none w-full"></textarea>
            <div className="flex justify-end">
              <button onClick={() => setIsAddDesc(false)} className="px-2 py-1 font-bold text-xs text-red-600">Cancel</button>
              <button onClick={handleSaveBtn} className="px-2 py-1 font-bold text-xs text-[#0079D3]">Save</button>
            </div>
          </div> : !desc ? <p onClick={() => setIsAddDesc(true)} className="text-xs cursor-pointer py-2 px-2 font-bold text-[#0079D3]">Add Description</p> : <p className="py-4">{desc}</p>}
        </div>
      )}
      {!isUserCommunity && <p className="py-4">{desc}</p>}
      <div className="flex gap-2 text-[#7C7C7C] items-center mb-5">
        <img className="h-5 w-5 dark:brightness-0 dark:invert-[1]" src={cake_slice} />
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
      <button onClick={() => navigate('/submit')} className="w-full py-1 font-semibold dark:bg-darkBtn dark:text-black bg-[#0079D3] rounded-2xl mt-4 text-white hover:bg-[rgba(0,121,211,0.9)]">Create Post</button>
    </div>
  )
}
function CommunityHeading({ image, name, view }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="w-full bg-[#33a8ff] h-20"></div>
      <div className="bg-white dark:bg-darkBg dark:text-white w-full h-auto">
        <div className={`flex flex-col justify-between max-w-[984px] pl-6 pr-4 ${view == 'card' ? 'mx-auto' : 'mx-0'} my-0`} >
          <div className="flex mt-[-14px] mb-3 items-start">
            <div className="flex">
              <img className="h-20 w-20 rounded-full border-4 bg-white bg-cover border-white" src={image ? image : rIcon} />
              <div className="inline-flex items-start flex-1 pl-[16px] mt-[20px] justify-between relative w-[calc(100% - 80px)]">
                <div className="inline-block pr-6 max-w-[calc(100% - 96px)]">
                  <p className="lg:text-3xl text-base font-bold">🔥 {name}</p>
                  <p className="mt-1 text-[#7c7c7c] lg:text-base text-xs font-semibold">r/{name}</p>
                </div>
                <div>
                  <button className="px-8 text-white py-1 font-bold dark:text-black dark:bg-darkBtn bg-[#0079D3] rounded-3xl">Join</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`static max-w-[984px] ${view == 'card' ? 'mx-auto' : 'mx-0'} pl-6 bg-inherit mt-[-4px] my-0`}>
          <p className="text-left border-b-[3px] mb-0.5 border-[#0079D3] inline-block px-3 font-semibold cursor-pointer">Posts</p>
        </div>
      </div>
    </div>
  )
}
export default CommunitiyPage;

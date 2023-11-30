import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import cardIcon from "../../../assets/card_icon.svg"
import classicIcon from "../../../assets/classic_icon.svg"
import arrow from "../../../assets/down_arrow.svg"
import EachPost from "./EachPost";
import Spinner from "../Loader/Spinner"
import InfiniteScroll from "react-infinite-scroll-component";
import PostViewMenu from "../Posts/PostViewMenu";
import { NavLink, useNavigate } from "react-router-dom";
function HomePage({ setView, view }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchPosts = useCallback(async (page) => {
    try {
      const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post?page=${page}`, {
        headers: {
          projectId: '3m8jkwvv8pjg',
          'Content-Type': 'application/json',
        }
      });
      const data = await resp.json();
      console.log(data.data);
      if (resp.ok) {
        setPosts((prevPosts) => [...prevPosts, ...data.data]);
      }
    } catch (err) {
      alert("Something went wrong!!");
    }
  }, []);

  useEffect(() => {
    if (page <= 4) {
      fetchPosts(page);
    }
    else setHasMore(false);
  }, [fetchPosts, page]);

  const fetchMore = () => {
    setPage((currentPage) => currentPage + 1);
  }
  return (
    <div className={`${view === 'card' ? 'lg:w-[65%] w-full' : 'w-[100%]'}`}>
      <CreatePost setView={setView} />

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<Spinner center={true} />}
        endMessage={
          <p className="text-center text-iconsDark my-5 uppercase font-semibold">
            Yay! You are all set
          </p>
        }
      >
        {posts.map((e, i) => (
          <NavLink to={`/r/${e.channel.name}/comments/${e._id}`} key={i}>
            <EachPost postData={e} />
            <hr className="my-1 mx-3 dark:border-darkBgHover" />
          </NavLink>
        ))}
      </InfiniteScroll>
    </div>
  )
};



function CreatePost({ setView }) {
  const [selectedView, setSelectedView] = useState('card');
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target))
        setShowMenu(false);
    }
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler)

  }, [])
  useEffect(() => {
    setView(selectedView);

  }, [selectedView])
  return (
    <div ref={menuRef} className="flex justify-between items-center relative lg:pt-4 lg:pb-3 py-4 px-2">
      <button onClick={() => navigate('/submit')} className="px-4 py-2 border border-gray-400 hover:border-gray-600 text-sm font-semibold rounded-3xl">Create a Post</button>
      <div onClick={() => setShowMenu(v => !v)} className={`flex gap-1 py-2 px-3 cursor-pointer rounded-3xl dark:hover:bg-darkBgHover hover:bg-searchHover ${showMenu && "bg-searchHover dark:bg-darkBgHover"} `}>
        <img src={selectedView === 'classic' ? classicIcon : cardIcon} className="dark:brightness-0 dark:invert-[1]" alt="icons" />
        <img className={`${showMenu ? 'rotate-180' : ""} duration-300 dark:brightness-0 dark:invert-[1]`} src={arrow} />
      </div>
      {showMenu && <PostViewMenu setShowMenu={setShowMenu} selectedView={selectedView} setSelectedView={setSelectedView} />}
    </div>
  )
}




export default HomePage;

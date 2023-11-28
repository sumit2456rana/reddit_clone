import React, { useEffect, useState } from "react"
import SearchNotFound from "./SearchNotFound";
import { NavLink } from "react-router-dom";
import { useUser } from '../../Provider/UserProvider';
import Spinner from "../Loader/Spinner";
import { usePopup } from "../../Provider/PopUpProvider";
function UserSearches({ query }) {
  const [user, setUser] = useState([]);
  const { authToken } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { addToPopUp } = usePopup();
  async function handleFollow(event, id, isFollowed) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/follow/${id}`, {
        method: isFollowed ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'projectID': '3m8jkwvv8pjg'
        }
      })
      const jsonResp = await resp.json();
      console.log(jsonResp);
      fetchData();
      if (isFollowed) {
        addToPopUp({ message: 'User unfollowed successfully', emotion: 'sad' });
      } else {
        addToPopUp({ message: jsonResp.message, emotion: 'happy' });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  }
  async function fetchData() {
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/user?search={"name":"${query}"}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        projectId: '3m8jkwvv8pjg',
      }
    })
    const data = await resp.json();
    setUser(data.data);

  }
  useEffect(() => {
    fetchData();
    // console.log(user);
  }, [query])
  return (
    <div className="w-full my-4">
      {user ? user.map((e) => (
        <NavLink key={e._id} to={`/u/${e.name}/${e._id}`} className="w-full dark:text-white flex justify-between items-center h-auto p-4 bg-white dark:bg-darkBg border border-[#ccc] dark:border-darkBorder rounded">
          <div className="flex items-center gap-3">
            <img className="h-10 w-10 rounded-full" src={e.profileImage ? e.profileImage : 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png'} />
            <p><span className="font-bold">u/{e.name}</span> <span className="text-xs text-[#7c7c7c]">&bull; {Math.round(Math.random() * 100)} karma</span></p>
          </div>
          <button onClick={(event) => handleFollow(event, e._id, e.isFollowed)} disabled={isLoading} className="disabled:bg-[#ccc] dark:bg-darkBorder dark:text-white flex justify-center items-center w-32 h-10 font-bold rounded-3xl text-[#0079D3] bg-[#f6f7f8] hover:bg-[#e3eef6]">{isLoading ? <Spinner /> : e.isFollowed ? 'Unfollow' : 'Follow'}</button>
        </NavLink>
      )) : <SearchNotFound query={query} />}
    </div>
  )
};

export default UserSearches;

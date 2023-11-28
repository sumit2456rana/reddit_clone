import React, { useEffect, useState } from "react"
import SearchNotFound from "./SearchNotFound";
import { NavLink } from "react-router-dom";
import rImage from '../../../assets/r_icon.svg'
function ChannelSearches({ query  }) {
  const [channels, setChannels] = useState([]);
  async function fetchData() {
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/channel?search={"name":"${query}"}`, {
      headers: {
        projectId: '3m8jkwvv8pjg',
      }
    })

    const data = await resp.json();
    setChannels(data.data);

  }
  useEffect(() => {
    fetchData();
    console.log(channels);
  }, [query])
  return (
    <div className="my-4 w-full">
      {channels ? channels.map((e) => (
        <NavLink to={`/r/${e.name}/${e._id}`} className="w-full p-4 dark:bg-darkBg dark:text-white dark:border-darkBorder bg-white h-auto flex justify-between items-center border border-[#ccc] rounded">
            <div className="flex gap-3 items-center">
                <img className={`h-10 w-10 rounded-full ${!e.image && 'dark:brightness-0 dark:invert-[1]'}`} src={e.image ? e.image : rImage} />
                <div>
                  <p><span className="font-semibold">r/{e.name}</span> <span className="text-xs text-[#7c7c7c]">&bull; {Math.round(Math.random()*1000 )} members</span></p>
                  <p className="text-xs pt-1 text-[#7c7c7c]">{e.description}</p>
                </div>
            </div>
            <button className="px-8 py-1 font-bold dark:bg-darkBorder dark:text-white rounded-2xl text-[#0079D3] bg-[#f6f7f8] hover:bg-[#e3eef6]">Join</button>
        </NavLink>
      )) : <SearchNotFound query={query} />}
    </div>
  )
};

export default ChannelSearches;

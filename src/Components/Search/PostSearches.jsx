import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import SearchNotFound from "./SearchNotFound";

function PostSearches({query}) {
    const [posts , setPosts] = useState([]);
    async function fetchData() {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post?search={"content":"${query}"}` , {
            headers : {
                projectId: '3m8jkwvv8pjg',
            }
        })
        const data = await resp.json();
        setPosts(data.data);
        
    }
    useEffect(() => {
        fetchData();
        console.log(posts);
    } , [query])
  return (
    <div className="my-4 w-full">
            {posts ? posts.map((e) => (
                <NavLink to={`/r/${e.channel.name}/comments/${e._id}`}>
                <div className="w-full dark:text-white bg-white dark:bg-darkBg dark:border-darkBorder border border-[#ccc] p-4">
                    <div className="flex gap-2 items-center pb-2">
                        <img className="h-8 w-8 rounded-full" src={e.channel.image} />
                        <NavLink to={`/r/${e.channel.name}/${e.channel._id}`} className="hover:underline cursor-pointer text-sm">r/{e.channel.name}</NavLink>
                        <span>&bull;</span>
                        <p className="text-xs text-[#7c7c7c]">Posted by <NavLink to={`/u/${e.author.name}/${e.author._id}`} className="hover:underline">u/{e.author.name}</NavLink></p>
                    </div>
                    <p>{e.content}</p>
                    <div className="flex gap-2 text-xs text-[#7c7c7c] mt-2">
                        <p>{e.likeCount} upvotes</p>
                        <p>{e.commentCount} comments</p>
                    </div>
                </div>
                </NavLink>
            )) : <SearchNotFound query={query} />}

    </div>
  )
};

export default PostSearches;

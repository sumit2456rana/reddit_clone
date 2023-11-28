import React, { useEffect, useState } from "react"
import { useUser } from "../../Provider/UserProvider";
import { NavLink } from "react-router-dom";
import SearchNotFound from "./SearchNotFound";
import timeAgo from "../Formatted Date/timeAgo";

function CommentSearches({ query }) {
  const [comments, setComments] = useState([]);
  const { authToken } = useUser();
  async function fetchData() {
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment?search={"content":"${query}"}`, {
      headers: {
        projectId: '3m8jkwvv8pjg',
        'Authorization': `Bearer ${authToken}`
      }
    })
    console.log(resp);
    const data = await resp.json();
    setComments(data.data);

  }    
  useEffect(() => {
    fetchData();

  }, [query])
  return (
    <div className="w-full my-4">
      {comments?.length > 0 ? comments.map((e) => (
        <div className="block dark:text-white p-4 bg-white dark:bg-darkBg rounded border dark:border-darkBorder border-[#ccc]">
          <p className="text-[#7c7c7c]">{timeAgo(e.createdAt)}</p>
          <p>{e.content}</p>
        </div>
      )) : <SearchNotFound query={query} />}
    </div>
  )
};

export default CommentSearches;

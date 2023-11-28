import { useState } from "react";
import { useUser } from "../../Provider/UserProvider";
import { NavLink } from "react-router-dom";

export default function CommentBox({ postId }) {
    const { userData, authToken } = useUser();
    const [userComment, setUserComment] = useState("");
    async function postComment() {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${postId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                projectId: "3m8jkwvv8pjg",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'content': userComment,
            })
        })
        const jsonData = await resp.json();
        console.log(jsonData);
    }
    return (
        <div className="pt-6 pb-2">
            <p>Comment as <NavLink to={`/user/${userData.name}`} className="text-blue-600 hover:underline">{userData.name}</NavLink></p>
            <textarea value={userComment} onChange={(e) => setUserComment(e.target.value)} className="border border-[#ccc] rounded py-2 px-4 mt-2 min-h-[170px] w-full" placeholder="What are your thoughts?"></textarea>
            <div className="bg-[#f6f7f8] w-full h-8 flex justify-end items-center rounded">
                <button onClick={postComment} disabled={userComment.length === 0} className="bg-[#0079d3] disabled:bg-[#848484] disabled:text-[#ffffff80] disabled:cursor-not-allowed px-4 py-1 rounded-3xl m-2 text-xs text-white font-bold">Comment</button>
            </div>
        </div>
    )
}
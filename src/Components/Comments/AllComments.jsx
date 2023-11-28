import React, { useEffect, useRef, useState } from "react"
import { NavLink, useParams } from "react-router-dom";
import { useUser } from "../../Provider/UserProvider";
import timeAgo from "../Formatted Date/timeAgo";
function AllComments() {
    const param = useParams();
    const postId = param.id;
    const [comment, setComment] = useState([]);
    const [editingCommentIndex, setEditingCommentIndex] = useState(null);
    const [editingComment, setEditingComment] = useState("");
    const { userData, authToken } = useUser();
    const myCommentRef = useRef(null);
    const [userComment, setUserComment] = useState("");
    async function postComment() {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${postId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'projectId': '3m8jkwvv8pjg',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'content': userComment,
            })
        });

        const jsonData = await resp.json();
        console.log(jsonData);
        getComments();
        setUserComment('');
        myCommentRef.current?.scrollIntoView();
    }

    async function getComments() {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}/comments`, {
            headers: {
                projectId: "3m8jkwvv8pjg",
                'Content-Type': 'application/json',
            }
        })
        const jsonData = await resp.json();
        setComment(jsonData.data);
        console.log(jsonData);
    }
    async function handleEditComment(index) {
        setEditingCommentIndex(index);
    }
    async function handleDeleteComment(commentId) {
        try {
            const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'projectId': '3m8jkwvv8pjg',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (!resp.ok) {
                throw new Error(`Failed to delete comment. Status: ${resp.status}`);
            }
            const contentType = resp.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const jsonResp = await resp.json();
                console.log(jsonResp);
            } else {
                console.log('Comment deleted successfully');
            }

            getComments();
        } catch (error) {
            console.error('Error deleting comment:', error.message);
        }
    }

    async function handleSaveComment(commentId) {
        setEditingCommentIndex(null);
        console.log(commentId);
        console.log(editingComment);
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                projectId: "3m8jkwvv8pjg",
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                "content": editingComment
            })
        })
        const jsonResp = await resp.json();
        console.log(jsonResp);
        getComments();
        setEditingComment("");
    }
    useEffect(() => {
        getComments();
    }, [])
    return (
        <div>
            <div className="pt-6 pb-2 overflow-x-auto">
                <p>Comment as <NavLink to={`/user/${userData.name}`} className="text-blue-600 hover:underline">{userData.name}</NavLink></p>
                <textarea value={userComment} onChange={(e) => setUserComment(e.target.value)} className="border dark:bg-inputDark dark:border-darkBorder focus:border-darkBorder border-[#ccc] rounded py-2 px-4 mt-2 min-h-[170px] w-full" placeholder="What are your thoughts?"></textarea>
                <div className="bg-[#f6f7f8] w-full h-8 flex justify-end items-center rounded dark:bg-darkBgHover">
                    <button onClick={postComment} disabled={userComment.length === 0} className="bg-[#0079d3]  disabled:bg-[#848484] disabled:text-[#ffffff80] disabled:cursor-not-allowed px-4 py-1 rounded-3xl m-2 text-xs text-white font-bold">Comment</button>
                </div>
            </div>
            <p className="text-md font-semibold my-2 text-[#aaa]">Top Comments</p>
            <hr className="dark:border-darkBorder" />
            <div className="my-4">
                {comment?.map((e, i) => (
                    <div key={i}>
                        <UserComment key={i} authorId={e.author} createdAt={e.createdAt} />

                        <div className="relative left-8 mx-4 my-2 h-fit">
                            <hr className="absolute  cursor-pointer my-2 hover:border-blue-600 border-l-2 h-auto border-[#eee] bottom-[-10px] lg:left-[-30px] left-[-34px] top-[0px] w-[1px]" />
                            {e.author === userData._id && editingCommentIndex === i ? (
                                <textarea
                                    onChange={(e) => setEditingComment(e.target.value)}
                                    defaultValue={e.content}
                                    className="border dark:bg-inputDark border-[#ccc] rounded py-2 px-4 min-h-[100px] w-4/5"></textarea>
                            ) : (
                                <p className="pb-2 lg:text-base text-[13px]">{e.content}</p>
                            )}

                            {e.author === userData._id && <div>
                                {editingCommentIndex === i ? (
                                    <button
                                        onClick={() => handleSaveComment(e._id)}
                                        className="px-4 py-1 dark:bg-darkBorder rounded-3xl bg-search text-xs mr-2 font-semibold"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEditComment(i)}
                                        className="px-4 py-1 rounded-3xl dark:bg-darkBorder bg-search text-xs mr-2 font-semibold"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button onClick={() => handleDeleteComment(e._id)} className="px-4 py-1 dark:bg-darkBorder rounded-3xl bg-search text-xs mr-2 font-semibold">Remove</button>
                            </div>}
                            {e.children.length > 0 && e.children.map((eachChild, idx) => (
                                <div key={idx}>
                                    <UserComment authorId={eachChild.author} createdAt={eachChild.createdAt} />
                                    <div className="relative left-8 mx-4 my-3 h-fit">
                                        <hr className="absolute  cursor-pointer my-2 hover:border-blue-600 border-l-2 h-auto border-[#eee] lg:bottom-[-15px] bottom-[-10px] lg:left-[-30px] left-[-34px] top-[0px] w-[1px]" />
                                        <p className="lg:text-base text-[12px]">{eachChild.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div ref={myCommentRef} />
        </div>
    )
}

function UserComment({ authorId, createdAt }) {
    const { authToken } = useUser();
    const formattedDate = timeAgo(createdAt);
    const [authorData, setAuthorData] = useState({});
    async function fetchAuthorInfo() {
        const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${authorId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                projectId: "3m8jkwvv8pjg",
                'Content-Type': 'application/json',
            }
        })
        const jsonData = await resp.json();
        setAuthorData(jsonData.data);
    }
    useEffect(() => {
        fetchAuthorInfo();
    }, [authorId])
    return (
        <div className="flex gap-2 items-center my-2">
            <img className="h-8 w-8 lg:h-10 lg:w-10 rounded-full" src={authorData.profileImage !== null ? authorData.profileImage : "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png"} />
            <NavLink to={`/user/${authorData.name}/${authorId}`} className="hover:underline font-semibold lg:text-[14px] text-xs">{authorData.name}</NavLink>
            <span className="text-[#aaa] ">&bull;</span>
            <span className="text-[#aaa] text-xs">{formattedDate}</span>
        </div> 
    )
}
export default AllComments;

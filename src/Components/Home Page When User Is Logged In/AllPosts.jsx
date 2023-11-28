import React, { useCallback, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Loader/Spinner";
import ChannelOverview from "./ChannelOverview";
import AuthorOverview from "./AuthorOverview";
import { NavLink } from "react-router-dom";
import Vote from "../Posts/Vote";
import Comment from "../Comments/Comment";
import { useUser } from "../../Provider/UserProvider";
import { usePopup } from "../../Provider/PopUpProvider";
function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { authToken } = useUser();
    const { addToPopUp } = usePopup();
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
    const handleVote = async (postId, type) => {
        try {
            const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`, {
                method: type === 'downvote' ? 'DELETE' : 'POST',
                headers: {
                    projectId: '3m8jkwvv8pjg',
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            const data = await resp.json();
            if (resp.ok) {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === postId
                            ? {
                                ...post,
                                likeCount: type === 'downvote' ? post.likeCount - 1 : post.likeCount + 1,
                            }
                            : post
                    )
                );
                console.log(data);

                addToPopUp({ message: data.message, emotion: 'happy' })
            } else {
                console.log(data);
                if (data.message === 'You already liked this post') {
                    addToPopUp({ message: data.message, emotion: 'happy' })
                } else {
                    addToPopUp({ message: data.message, emotion: 'sad' })
                }
            }
        } catch (err) {
            console.error('Error updating vote:', err);
        }
    };
    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<Spinner center={true} />} // Show loader only when there are posts to load
            endMessage={
                <p className="text-center my-5 uppercase font-semibold text-iconsDark">
                    Yay! You are all set
                </p>
            }
        >
            {posts.map((post, index) => (
                <NavLink to={`/r/${post.channel.name}/comments/${post._id}`} key={index} className="bg-white border dark:hover:border-white dark:bg-darkBg dark:border-darkBorder dark:text-white border-[#ccc] rounded h-auto my-4 w-full flex">
                    <Vote likes={post.likeCount} onvote={type => handleVote(post._id, type)} />
                    <PostContent
                        content={post.content}
                        name={post.channel.name}
                        authorName={post.author.name}
                        image={post.channel.image}
                        comment={post.commentCount}
                        channelId={post.channel._id}
                        authorId={post.author._id}
                        pathName={`/r/${post.channel.name}/comments/${post._id}`}
                    />
                </NavLink>
            ))}
        </InfiniteScroll>
    )
}

const PostContent = ({ content, name, authorName, image, comment, channelId, authorId, pathName }) => {
    const [showChannelData, setShowChannelData] = useState(false);
    const [showAuthorData, setShowAuthorData] = useState(false);
    function addToRecents(id, name, image) {
        let restRecents = JSON.parse(localStorage.getItem('Recents')) || [];

        const newEntry = { id, name, image };
        if (restRecents.some(entry => entry.id === newEntry.id)) {
            return;
        } else {
            const updatedRecents = [newEntry, ...restRecents.slice(0, 4)];

            localStorage.setItem('Recents', JSON.stringify(updatedRecents));
        }
    }
    return (
        <div className="py-2 px-2 relative">
            <div className="flex gap-2 items-center">
                <img className="h-6 w-6 font-semibold rounded-full" src={image} />
                <span
                    className="hover:underline text-sm cursor-pointer font-semibold"
                    onMouseOver={() => setShowChannelData(true)}
                    onMouseOut={() => setShowChannelData(false)}
                    onClick={() => addToRecents(channelId, name, image)}
                >
                    <NavLink to={`r/${name}/${channelId}`}>r/{name}</NavLink>

                    {showChannelData && <ChannelOverview image={image} channelName={name} channelId={channelId} />}
                </span>
                <span>&bull;</span>
                <span className="sm:text-xs text-[10px] font-medium dark:text-iconsDark text-[rgba(0,0,0,0.6)]">Posted by
                    <span
                        onMouseOver={() => setShowAuthorData(true)}
                        onMouseOut={() => setShowAuthorData(false)}
                        className="cursor-pointer hover:underline">
                        <NavLink to={`user/${authorName}/${authorId}`}> u/{authorName}</NavLink>
                        {showAuthorData && <AuthorOverview authorName={authorName} authorId={authorId} />}
                    </span>
                </span>
            </div>
            <div className="py-2 text-sm md:text-base">
                <p>{content}</p>
            </div>
            <Comment commentCount={comment} pathName={pathName} />

        </div>
    )
}
export default AllPosts;

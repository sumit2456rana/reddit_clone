import React, { useState } from "react"
import CreatePostTab from "../Create Post/CreatePostTab";
import PostTags from "../Posts/PostTags";
import AllPosts from "./AllPosts";
function HomePageWhenUserLoggedIn({setView}) {
  const [selectedView , setSelectedView] = useState('');
  function handleSelectedView(view) {
    setSelectedView(view);
    setView(view);
  } 
  
  return (
    <div className={`${selectedView == 'card' ? 'lg:w-[640px]' : 'w-[full]'} w-full`}>
        <CreatePostTab />
        <PostTags handleSelectedView={handleSelectedView} />
        <AllPosts />
    </div>
  )
};

export default HomePageWhenUserLoggedIn;

import React from "react"
import { useNavigate } from "react-router-dom";
const avatars = [
  'https://i.redd.it/snoovatar/avatars/78c4bb70-2728-44fd-839c-f22ddd3e3095.png',
  'https://i.redd.it/snoovatar/avatars/f40e4f37-7d10-445a-a862-e64a1a411d0b.png',
  'https://i.redd.it/snoovatar/avatars/16f0f3e7-65dd-4dbf-ba8e-fb7d15245253.png',
  'https://i.redd.it/snoovatar/avatars/4bea0aa5-a7b1-4a43-848d-2d771d0dfd8b.png',
  'https://i.redd.it/snoovatar/avatars/b988f68e-4eae-4b35-9a65-9247c673c311.png',
  'https://i.redd.it/snoovatar/avatars/b87e0377-9011-4fcf-87a4-a9108c003423.png',
  'https://i.redd.it/snoovatar/avatars/fbc519e4-0262-442c-8bed-8f88b00b6700.png',
  'https://i.redd.it/snoovatar/avatars/169c36ac-5ab1-42ad-8e03-faa4e379a3f3.png',
  'https://i.redd.it/snoovatar/avatars/a176aaeb-34a9-42e6-893d-f4dceae46c2d.png',
  'https://i.redd.it/snoovatar/avatars/basic/10a8e875-f403-43c6-ab75-655e72b0f5de.png'
]
function AuthorOverview({authorName , authorId}) {
  const navigate = useNavigate();
  return (
    <div onClick={(e) => {
      e.preventDefault();
      }} className="max-w-[380px] dark:bg-darkBg dark:text-white min-w-[240px] z-20 rounded h-auto cursor-default bg-white absolute top-7 shadow-[0_1px_3px_rgba(0,0,0,.2)]">

      <div className="bg-[#33a8ff] h-[94px] rounded-t w-[calc(100% - 2px)]"></div>
      <div>
        <img className="h-[auto] mt-[-70px] mx-auto w-[138px]" src={avatars[Math.floor(Math.random() * 10)]} />
      </div>
      <div className="py-2">
        <p className="text-lg font-bold text-center dark:text-white text-black">{authorName}</p>
        <p className="text-center text-xs">
          <span>u/{authorName}</span>
          <span className="px-1">&bull;</span>
          <span>10m</span>
        </p>
      </div>
      <div className="flex pt-2 px-4 gap-20 text-black text-lg">
        <div>
          <p className="font-semibold dark:text-white">{(Math.random() * 100).toFixed(1)}k</p>
          <p className="text-[#7c7c7c] text-xs font-medium">Post Karma</p>
        </div>
        <div>
          <p className="font-semibold dark:text-white">{(Math.random() * 100).toFixed(1)}k</p>
          <p className="text-[#7c7c7c] text-xs font-medium">Comment Karma</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button onClick={() => navigate(`/user/${authorName}/${authorId}`)} className="dark:text-darkBtn font-bold dark:border-darkBtn w-11/12 py-2  border border-[#0079D3] my-2 rounded-2xl text-[#0079D3]">Start Chat</button>
        <button onClick={() => navigate(`/user/${authorName}/${authorId}`)} className="dark:bg-darkBtn font-bold dark:text-black w-11/12 py-2 bg-[#0079D3] rounded-2xl mb-2 text-white hover:bg-[rgba(0,121,211,0.9)]">Follow</button>
      </div>
    </div>
  )
};

export default AuthorOverview;

import React, { useState } from "react"
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../Provider/UserProvider";
function CreatePostPage() {
  const [searchParams] = useSearchParams();
  const urlParam = searchParams.get("url");
  const imageParam = searchParams.get("image");
  const [type, setType] = useState(urlParam ? 'link' : imageParam ? 'image' : 'post');
  const { userData } = useUser();

  return (
    <div className="pages px-0 flex justify-center gap-6 dark:bg-[#030303] dark:text-white">
      <div className="lg:w-1/2 w-full lg:px-0 px-2">
        <Header />
        <div className="w-48 py-1 mb-4 border-2 dark:bg-darkBg dark:border-darkBorder border-[#EDEFF1] px-2 gap-3 flex items-center bg-white rounded-md">
          <img className="h-8 w-8" src="https://i.redd.it/snoovatar/avatars/6afe1d9f-f050-4f7b-a180-05e7eb308903.png" />
          <p className="font-bold">{userData.name}</p>
        </div>
        <PostHeader type={type} setType={setType} />
        <PostBox type={type} />
        <BottomPart />
      </div>
      <PostingToReddit />
    </div>
  )
};

function Header() {
  return (
    <div className="flex justify-between w-full pb-4 border-b dark:border-darkBorder border-white h-10 mt-10 mb-4">
      <h1 className="text-xl font-semibold">Create a Post</h1>
      <div className="h-8 w-18 py-2 cursor-pointer px-4 rounded-2xl dark:hover:bg-darkBgHover hover:bg-[#ccc] flex gap-1 items-center">
        <h1 className="tracking-widest uppercase text-xs text-[#0079D3] font-bold">Drafts</h1>
        <span className="text-xs text-white rounded h-5 w-4 flex justify-center items-center bg-[#878A8C]">0</span>
      </div>
    </div>
  )
}
function PostHeader({ type, setType }) {
  const handleOnClick = (val) => {
    setType(val);
  }
  return (
    <div className="flex w-full h-14 dark:bg-darkBg dark:border-darkBorder bg-white border-[0.5px] border-[#EDEFF1] rounded-t-lg">
      <div onClick={() => handleOnClick('post')} className={`flex items-center gap-2 w-1/4 ${type === 'post' ? 'border-b-4 border-b-blue-600 text-blue-600 dark:border-b-blue-600' : 'text-[#8b8e90]'} border-r border-[#EDEFF1] dark:border-darkBorder justify-center font-bold hover:bg-[#0079d30d] cursor-pointer`}>
        <PostAddOutlinedIcon />
        <span className="">Post</span>
      </div>
      <div onClick={() => handleOnClick('image')} className={`${type == 'image' ? 'border-b-4 border-b-blue-600 text-blue-600 dark:border-b-blue-600' : 'text-[#8b8e90]'} flex items-center gap-2 w-1/4 border-r border-[#EDEFF1] dark:border-darkBorder justify-center font-bold hover:bg-[#0079d30d] cursor-pointer`}>
        <ImageOutlinedIcon />
        <span>Image</span>
      </div>
      <div onClick={() => handleOnClick('link')} className={`${type == 'link' ? 'border-b-4 border-b-blue-600 text-blue-600 dark:border-b-blue-600' : 'text-[#8b8e90]'} flex items-center gap-2 w-1/4 border-r border-[#EDEFF1] dark:border-darkBorder justify-center font-bold hover:bg-[#0079d30d] cursor-pointer`}>
        <i className="fa-solid fa-link"></i>
        <span>Link</span>
      </div>
      <div className={`flex items-center gap-2 w-1/4 justify-center font-bold cursor-not-allowed text-[#878a8c80]`}>
        <ListOutlinedIcon />
        <span>Poll</span>
      </div>
    </div>
  )
}

function PostBox({ type }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState('');
  const [image, setImage] = useState();
  const { authToken , userData } = useUser();
  const navigate = useNavigate();
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage({ file, previewUrl: reader.result });
        }
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  }
  const submitPost = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    
    if (type === 'image' && image) {
      formData.append('images', image.file);
    }
    const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post`, {
      method: 'POST',
      headers: {
        'projectId': '3m8jkwvv8pjg',
        "Authorization": `Bearer ${authToken}`
      },
      body: formData
    })
    const jsonResp = await resp.json();
    if(resp.ok) {
      navigate(`/user/${userData.name}`)
    }
    console.log(jsonResp);
  }
  return (
    <div className="w-full p-4 bg-white dark:bg-darkBg dark:border-darkBorder h-auto border-2 border-[#EDEFF1]">
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="dark:bg-inputDark dark:border-darkBorder w-full px-4 py-2 border-2 mb-2 border-[#EDEFF1] rounded-md" placeholder="Title" />

      {type == 'post' && <textarea value={content} onChange={(e) => setContent(e.target.value)} className="dark:bg-inputDark dark:border-darkBorder w-full px-4 py-2 border-2 mb-4 border-[#EDEFF1] rounded-md min-h-[138px]" placeholder="Text (Optional)"></textarea>}

      {type == 'image' && <div className="w-full px-4 py-2 border-2 dark:border-darkBorder mb-4 flex justify-center items-center border-[#EDEFF1] rounded-md h-[138px]">
        <input className="dark:bg-inputDark  ml-40" type="file" accept="image/*" onChange={handleImage} />
      </div>}

      {type == 'link' && <textarea value={content} onChange={(e) => setContent(e.target.value)} className="dark:bg-inputDark dark:border-darkBorder w-full px-4 py-2 border-2 mb-4 border-[#EDEFF1] resize-none rounded-md h-[70px]" placeholder="Url"></textarea>}

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="border-2 dark:border-darkBorder border-[#EDEFF1] text-[#878a8c80] cursor-not-allowed w-auto py-1 rounded-3xl px-4 items-center flex gap-1">
          <AddOutlinedIcon />
          <span>OC</span>
        </div>
        <div className="border-2 dark:border-darkBorder border-[#EDEFF1] text-[#878a8c80] cursor-not-allowed w-auto px-4 rounded-3xl items-center flex gap-1">
          <AddOutlinedIcon />
          <span>Spolier</span>
        </div>
        <div className="border-2 dark:border-darkBorder border-[#EDEFF1] text-[#878a8c80] cursor-not-allowed w-auto px-4 rounded-3xl items-center flex gap-1">
          <AddOutlinedIcon />
          <span>NSFW</span>
        </div>
        <div className="border-2 dark:border-darkBorder border-[#EDEFF1] text-[#878a8c80] cursor-not-allowed w-auto px-4 py-1 rounded-3xl items-center flex gap-1">
          <SellOutlinedIcon />
          <span>Flair</span>
        </div>
      </div>

      <hr className="mb-4 dark:border-darkBorder" />

      <div className="flex justify-end gap-2">
        <button className="px-4 py-1 rounded-3xl border-2 cursor-not-allowed border-[#EDEFF1] dark:border-darkBorder text-[#878a8c80]">Save Draft</button>
        <button onClick={submitPost} disabled={title.length == 0 && content.length == 0} className="px-5 disabled:bg-[#ccc] disabled:cursor-not-allowed py-1 rounded-3xl dark:bg-darkBtn dark:text-black text-white bg-[#0079D3]">Post</button>
      </div>
    </div>
  )
}

function BottomPart() {
  return (
    <div className="w-full dark:bg-darkBg dark:border-darkBorder bg-[#F6F7F8] border border-[#EDEFF1] pt-2 px-4 pb-[21px] rounded-b-lg">
      <div>
        <input className="w-8" type="checkbox" id="postReply" />
        <label htmlFor="postReply">Send me post reply notifications</label>
      </div>
      <a target="_blank" href="https://www.reddit.com/settings#connected-accounts" className="pt-3 px-2 text-sm font-semibold hover:underline text-blue-600">Connect accounts to share your post <span className="text-black dark:brightness-0 dark:invert-[1]"><InfoOutlinedIcon /></span></a>
    </div>
  )
}

function PostingToReddit() {
  return (
    <div className="mt-16 lg:block hidden">
      <div className="w-80 h-64 p-3 rounded-md bg-white dark:bg-darkBg dark:border-darkBorder">
        <div className="flex gap-2 items-center">
          <img className="h-8 w-8" src="https://i.redd.it/snoovatar/avatars/6afe1d9f-f050-4f7b-a180-05e7eb308903.png" />
          <p className="font-semibold">Posting to Reddit</p>
        </div>
        <hr className="mt-2 dark:border-darkBorder" />
        <ol className="font-semibold text-sm">
          <li className="py-2 px-1">1. Remember the human</li><hr className="dark:border-darkBorder" />
          <li className="py-2 px-1">2. Behave like you would in real life</li><hr className="dark:border-darkBorder" />
          <li className="py-2 px-1">3. Look for the original source of content</li><hr className="dark:border-darkBorder" />
          <li className="py-2 px-1">4. Search for duplicates before posting</li><hr className="dark:border-darkBorder" />
          <li className="py-2 px-1">5. Read the community’s rules</li><hr className="dark:border-darkBorder" />
        </ol>
      </div>
      <div>
        <p className="text-xs my-4 text-[#7c7c7c] font-semibold">Please be mindful of reddit's <span className="text-blue-600 cursor-pointer">content policy</span> <br /> and practice good <span className="text-blue-600 cursor-pointer">reddiquette</span>.</p>
      </div>
    </div>
  )
}
export default CreatePostPage;

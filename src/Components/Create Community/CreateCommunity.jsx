import React, { useState } from "react"
import { useUser } from '../../Provider/UserProvider';
import { useNavigate } from "react-router-dom";
function CreateCommunity({ setShowCommunity }) {
    const { authToken } = useUser();
    const [communityName, setCommunityName] = useState("");
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    async function handleCreateCommunity() {
        if (communityName.length <= 0) {
            setErr('A community name is required');
        } else {
            setErr('');
            try {
                const resp = await fetch(`https://academics.newtonschool.co/api/v1/reddit/channel`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                        projectId: '3m8jkwvv8pjg',
                    },
                    body: JSON.stringify({
                        'name': communityName,
                    }),
                });

                const data = await resp.json();
                if (resp.ok) {
                    console.log(data);
                    navigate(`/r/${communityName}/${data.data._id}`)
                    setShowCommunity(false);
                } else {
                    setErr(`Sorry, r/${communityName} is taken. Try another.`)
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="modal">
            <div className="bg-white dark:border-darkBorder border border-[#ccc] dark:bg-darkBg dark:text-white h-[auto] rounded w-[492px] p-4 relative">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold">Create a community</h1>
                    <i onClick={() => setShowCommunity(false)} className="fa-solid fa-xmark text-[#7c7c7c] text-2xl cursor-pointer"></i>
                </div>
                <hr className="my-4 dark:border-darkBgHover" />
                <p className="font-semibold">Name</p>
                <p className="text-xs text-[#7c7c7c] mb-4">Community names including capitalization cannot be changed.</p>
                <div className="flex px-3 py-1.5 mb-3 rounded dark:border-darkBgHover border border-[#edeff1]">
                    <span className="text-[#989ca0]">r/</span>
                    <input
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        maxLength={21}
                        type="text"
                        className="outline-none ml-1 w-full bg-transparent "
                    />
                </div>
                <p className={`text-xs text-[#7c7c7c] ${!err && 'mb-7'}`}>{21 - communityName.length} Characters remaining</p>
                {err && <p className="text-xs text-red-500 font-medium mb-4">{err}</p>}
                <p className="font-semibold mb-2">Community type</p>
                <div className="flex gap-3 items-center mb-2">
                    <input checked type="radio" name="option" className="mr-1" />
                    <i className="fa-solid fa-user text-sm text-[#878a8c]"></i>
                    <span className="text-md font-semibold">Public</span>
                    <span className="text-xs text-[#989ca0]">Anyone can view, post, and comment to this community</span>
                </div>
                <div className="flex gap-2 items-center mb-2">
                    <input type="radio" name="option" className="mr-1" />
                    <i className="fa-solid fa-eye-slash text-sm text-[#878a8c]"></i>
                    <span className="text-md font-semibold">Restricted</span>
                    <span className="text-xs text-[#989ca0]">Anyone can view, post, and comment to this community</span>
                </div>
                <div className="flex gap-2 items-center mb-10">
                    <input type="radio" name="option" className="mr-1" />
                    <i className="fa-solid fa-lock text-sm text-[#878a8c]"></i>
                    <span className="text-md font-semibold">Private</span>
                    <span className="text-xs text-[#989ca0]">Anyone can view, post, and comment to this community</span>
                </div>
                <p className="font-semibold">Adult content</p>
                <div className="flex items-center gap-1 mt-2 mb-10">
                    <label for="cbx" class="cbx">
                        <div class="checkmark">
                            <input type="checkbox" id="cbx" />
                            <div class="flip">
                                <div class="front"></div>
                                <div class="back">
                                    <svg viewBox="0 0 16 14" height="14" width="16">
                                        <path d="M2 8.5L6 12.5L14 1.5"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </label>
                    <span className="px-1 text-xs bg-red-600 text-white font-semibold">NSFW</span>
                    <span>18+ year old community</span>
                </div>

                <div className="bg-[#EDEFF1] dark:bg-darkBgHover flex justify-end items-center gap-2 p-4 rounded-b w-auto m-[-16px]">
                    <button onClick={() => setShowCommunity(false)} className="w-20 py-1 dark:border-darkBtn dark:text-darkBtn dark:hover:text-black hover:bg-[#e4ebf0] font-bold border border-[#0079D3] rounded-2xl text-[#0079D3]">Cancel</button>
                    <button onClick={handleCreateCommunity} className="w-44 py-1 font-bold dark:bg-darkBtn dark:text-black bg-[#0079D3] rounded-2xl text-white hover:bg-[rgba(0,121,211,0.9)]">Create Community</button>
                </div>
            </div>
        </div>
    )
};

export default CreateCommunity;

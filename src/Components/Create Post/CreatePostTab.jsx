import React from "react"
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { useNavigate } from "react-router-dom";
import { useStatusAndTheme } from "../../Provider/StatusAndThemeProvider";
function CreatePostTab() {
    const {status} = useStatusAndTheme();
    const navigate = useNavigate();
    return (
        <div className="flex relative mb-5 p-2 rounded justify-around gap-2 border items-center w-full border-[#ccc] bg-white dark:bg-darkBg dark:border-darkBorder">
            <div className="h-10 relative w-10 flex justify-center items-center rounded-full bg-[#EDEFF1] dark:bg-inputDark">
                <img className="h-12 w-12" src="https://i.redd.it/snoovatar/avatars/6afe1d9f-f050-4f7b-a180-05e7eb308903.png" />
                {status && <span className="h-4 block absolute right-0 bottom-[-2px] w-4 border-2 border-white dark:border-darkBg rounded-full bg-[#46d160]"></span>}
            </div>
            <input onClick={() => navigate('/submit')} className="w-[85%] hover:border-[rgb(0,121,211)] hover:bg-white dark:bg-inputDark dark:border-darkBorder dark:text-white dark:hover:border-white bg-[#F6F7F8] h-[38px] rounded-md px-4 outline-none border border-bg-[#EDEFF1]" type="text" placeholder="Create Post" />
            <div onClick={() => navigate('/submit?image=true')} className="dark:hover:bg-darkBgHover cursor-pointer h-10 w-10 flex rounded-sm justify-center items-center dark:text-iconsDark hover:bg-search">
                <InsertPhotoOutlinedIcon />
            </div>
            <div onClick={() => navigate('/submit?url=ture')} className="dark:hover:bg-darkBgHover cursor-pointer h-10 w-10 rounded-sm flex justify-center items-center dark:text-iconsDark hover:bg-search">
            <i className="fa-solid fa-link"></i>
            </div>
        </div>
    )
};

export default CreatePostTab;

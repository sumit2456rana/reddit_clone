import React from "react"
import happyEmoji from '../../../assets/happy_icon.svg';
import CloseIcon from '@mui/icons-material/Close';
import { usePopup } from "../../Provider/PopUpProvider";
function PopUp() {
    const { popupArr, removeFromPopUp } = usePopup();
    return (
        <div className="fixed bottom-0 z-[200] flex justify-center items-center flex-col mx-auto w-0">
            {/* <div className="popup relative hover:pl-6  min-h-[52px] mb-3 flex pl-2 w-[476px] rounded box-border shadow-[0_2px_15px_0_rgba(0,0,0,.3)] items-center bg-white dark:bg-darkBg dark:border-darkBorder dark:text-white border border-[#878A8C]">
        <div className="flex items-center">
            <img className="h-6 w-6 mb-1 ml-3" src={happyEmoji} />
            <span className="mx-3">Changes Saved</span>
        </div>
        <CloseIcon className="closeIcon text-white" />
      </div> */}
            {popupArr && popupArr.map((e, i) => (
                <div key={i} className="popup relative hover:pl-6 min-h-[52px] mb-3 flex pl-2 lg:w-[476px] w-[350px] rounded box-border shadow-[0_2px_15px_0_rgba(0,0,0,.3)] items-center bg-white dark:bg-darkBg dark:border-darkBorder dark:text-white border border-[#878A8C]">
                    <div className="flex items-center">
                        <img className={`h-8 w-8 mb-1 ml-3 ${e.emotion === 'sad' && 'dark:brightness-0 dark:invert-[1]'}`} src={e.emotion === 'happy' ? happyEmoji : '/Reddit Images/Sad.png'} />
                        <span className="mx-3 font-semibold lg:text-base text-xs">{e.message}</span>
                    </div>
                    <CloseIcon onClick={() => removeFromPopUp(i)} className="closeIcon text-white "  />
                </div>
            ))}
        </div>
    )
};

export default PopUp;

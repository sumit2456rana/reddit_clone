import { createContext, useContext, useEffect, useState } from "react";

const PopUpContext = createContext();

export function PopUpProvider({ children }) {
    const [popupArr, setPopupArr] = useState([]);
    
    function addToPopUp(obj) {
        setPopupArr([...popupArr, obj]);
    }
    useEffect(() => {
        let intervalId;
    
        const removePopups = () => {
          if (popupArr.length > 0) {
            const remainingPopups = popupArr.slice(5);
            setPopupArr(remainingPopups);
          } else {
            clearInterval(intervalId);
          }
        };
        intervalId = setInterval(removePopups, 3000);
            console.log(popupArr);
            return () => clearInterval(intervalId);


      }, [popupArr]);
    

    function removeFromPopUp(indexToRemove) {
        setPopupArr((prevArr) =>
            prevArr.filter((_, index) => index !== indexToRemove)
        );
    }

    let obj = {
        popupArr,
        addToPopUp,
        removeFromPopUp,
    };

    return <PopUpContext.Provider value={obj}>{children}</PopUpContext.Provider>

}

export function usePopup() {
    return useContext(PopUpContext);
}
import React, { useEffect, useState } from "react";
import rIcon from "../../../assets/r_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../Provider/UserProvider";
import { useLogInOrSignUp } from "../../Provider/LoginOrSignUp";
const communitiesData = [
    {
        img: "https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_p6kb2m6b185b1.png",
        comunityName: "AskReddit",
        members: "43,627,773",
    },
    {
        img: "https://styles.redditmedia.com/t5_2rfxx/styles/communityIcon_9yj66cjf8oq61.png",
        comunityName: "leagueoflegends",
        members: "6,766,747",
    },
    {
        img: "https://styles.redditmedia.com/t5_2xinb/styles/communityIcon_qqtvyeb0bj221.png",
        comunityName: "OutOfTheLoop",
        members: "3,231,156",
    },
    {
        img: "https://styles.redditmedia.com/t5_388p4/styles/communityIcon_1xjv62tivxy61.png",
        comunityName: "discordapp",
        members: "1,100,358",
    },
    {
        img: "https://styles.redditmedia.com/t5_2s0fe/styles/communityIcon_2cbkzwfs6kr21.png",
        comunityName: "Twitch",
        members: "1,381,721",
    },
    {
        img: "https://styles.redditmedia.com/t5_2xrd1/styles/communityIcon_ucwxxio6xsrb1.png",
        comunityName: "gtaonline",
        members: "1,449,661",
    },
    {
        img: "https://styles.redditmedia.com/t5_2r0cn/styles/communityIcon_qadm8xvply981.png",
        comunityName: "relationship_advice",
        members: "10,298,210",
    },
    {
        img: "",
        comunityName: "starbucks",
        members: "262,862"
    },
    {
        img: "https://styles.redditmedia.com/t5_2rfz5/styles/communityIcon_0jgg9qqdkbxb1.png",
        comunityName: "OnePiece",
        members: "2,678,456",
    },
    {
        img: "https://styles.redditmedia.com/t5_2sqho/styles/communityIcon_ewgnkceizttb1.png",
        comunityName: "GlobalOffensive",
        members: "2,115,774",
    },
    {
        img: "https://styles.redditmedia.com/t5_3aobb/styles/communityIcon_2c0ko9cll8k21.png",
        comunityName: "GooglePixel",
        members: "1,024,356",
    },
    {
        img: "",
        comunityName: "HomeImprovement",
        members: "4,382,542",
    },
    {
        img: "https://styles.redditmedia.com/t5_2r4oc/styles/communityIcon_lmvv9k5nrby11.png",
        comunityName: "tipofmytounge",
        members: "2,356,755",
    },
    {
        img: "https://styles.redditmedia.com/t5_2qh4i/styles/communityIcon_d77x0sszups01.png",
        comunityName: "books",
        members: "23,192,459",
    },
    {
        img: "https://styles.redditmedia.com/t5_2u9xs/styles/communityIcon_n3i2cppmxow81.jpg",
        comunityName: "Windows10",
        members: "430,775",
    },
    {
        img: "",
        comunityName: "Cooking",
        members: "3,711,964",
    },
    {
        img: "",
        comunityName: "baseball",
        members: "2,505,388",
    },
    {
        img: "https://styles.redditmedia.com/t5_fknyy/styles/communityIcon_z40tlzmvbyw91.png",
        comunityName: "BollywoodGossip",
        members: "14,254,321",
    },
    {
        img: "https://styles.redditmedia.com/t5_2ubgg/styles/communityIcon_lkxajjefezh51.png",
        comunityName: "pics",
        members: "30,256,704",
    },
    {
        img: "",
        comunityName: "breakingbad",
        members: "1,937,896",
    },
]
function PopularComunities({ view }) {
    const {isUserLoggedIn} = useUser();
    const {openLogIn} = useLogInOrSignUp();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [communityData, setCommunityData] = useState([]);
    const toggleShow = () => {
        setShow(!show);
    };
    async function fetchData() {
        const resp = await fetch('https://academics.newtonschool.co/api/v1/reddit/channel', {
            headers: {
                projectId: '3m8jkwvv8pjg',
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json();
        console.log(data);
        setCommunityData(data.data);
    }
    function handleOnClick(id , name) {
            navigate(`/r/${name}/${id}`);
        
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className={`w-80 ${show ? "h-[75vh]" : "h-[25.3rem]"} ${view == "card" ? "lg:block" : "lg:hidden"} hidden lg:block bg-[#F9FAFA] dark:bg-darkBg styled-scrollbars overflow-auto sticky top-20 right-20 rounded-xl px-3 py-4 mt-4`}>
            <h1 className="uppercase font-semibold text-sm">Popular Communities</h1>

            <ul className="content py-3">
                {
                    communityData?.map((e, i) => (
                        i <= 4 ? (
                            <EachComunities key={i} img={e.image} name={e.name} id={e._id} members={Math.floor(Math.random() * 1000)} handleOnClick={handleOnClick} />
                        ) : show && (
                            <EachComunities key={i} img={e.image} name={e.name} id={e._id} members={Math.floor(Math.random() * 1000)} handleOnClick={handleOnClick} />
                        )

                    ))
                }
            </ul>

            <div className="button-container">
                <button className="dark:hover:bg-darkBgHover px-3 py-1 font-semibold rounded-2xl text-sm hover:bg-[#ccc]" onClick={toggleShow}>
                    {show ? "See Less" : "See More"}
                </button>
            </div>
        </div>
    );
}

function EachComunities({ img, name, members,id, handleOnClick }) {
    return (
        <li onClick={() => handleOnClick(id , name)} className="flex px-4 py-3 items-center rounded-md gap-4 hover:bg-[#EAEDEF] dark:hover:bg-darkBgHover cursor-pointer">
            <img className="h-8 w-8 rounded-full" src={img ? img : rIcon} />
            <div className="flex text-sm flex-col ">
                <span>r/{name}</span>
                <span className="text-xs">{members} members</span>
            </div>
        </li>
    )
}
export default PopularComunities;

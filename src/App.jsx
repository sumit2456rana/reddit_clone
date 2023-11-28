import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import MainPage from "./Pages/MainPage";
import { Route, Routes } from "react-router-dom";
import CreatePostPage from './Pages/CreatePostPage';
import ComunitiyPage from './Pages/CommunityPage';
import { useUser } from "./Provider/UserProvider";
import UserPage from "./Pages/UserPage";
import UserProfile from "./Pages/UserProfile";
import CommentPage from "./Pages/CommentPage";
import { useLogInOrSignUp } from "./Provider/LoginOrSignUp";

import Chat from "./Components/Chat/Chat";
import CloseIcon from '@mui/icons-material/Close';
import { useChat } from "./Provider/ChatProvider";
import SearchPage from "./Pages/SearchPage";
import PopUp from "./Components/Pop up/PopUp";
import SideBar from "./Components/DropDowns/SideBar";
import { useSidebar } from "./Provider/SideBarProvider";
import Premium from "./Pages/Premium";
import { useMemo } from "react";
export default function App() {
  const { openLogIn } = useLogInOrSignUp();
  const { isChatOpened, isChatMinimized, closeMinimizeChat, openChat } = useChat();
  const { isSidebarOpen } = useSidebar();
  function ProtectedRoutes({ children }) {
    const { isUserLoggedIn } = useUser();
    if (!isUserLoggedIn) {
      return openLogIn();
    }
    return children;
  }
  const memoizedRoutes = useMemo(
    () => (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/submit" element={
          <ProtectedRoutes>
            <CreatePostPage />
          </ProtectedRoutes>
        } />
        <Route path="r/:name/:id" element={
          <ProtectedRoutes>
            <ComunitiyPage />
          </ProtectedRoutes>
        } />
        <Route path="/:user/:name/:id" element={
          <ProtectedRoutes>
            <UserPage />
          </ProtectedRoutes>
        } />
        <Route path="/user/:name" element={
          <ProtectedRoutes>
            <UserProfile />
          </ProtectedRoutes>
        } />
        <Route path="/r/:name/comments/:id" element={
          <ProtectedRoutes>
            <CommentPage />
          </ProtectedRoutes>
        } />
        <Route path="/search" element={
          <ProtectedRoutes>
            <SearchPage />
          </ProtectedRoutes>
        } />
        <Route path="/premium" element={
          <ProtectedRoutes>
            <Premium />
          </ProtectedRoutes>
        } />
      </Routes>
    ),
    []
  );
  return (
    <>
      <Navbar />
      {isChatOpened && (isChatMinimized ? <div onClick={openChat} className="fixed bottom-0 dark:bg-darkBg dark:text-white shadow-2xl bg-white w-36 flex p-2 justify-between items-center right-8 rounded-t-2xl">
        <p className="font-semibold text-lg">Chat</p>
        <CloseIcon onClick={(e) => {
          e.stopPropagation();
          closeMinimizeChat()
        }
        } className="cursor-pointer" />
      </div> : <Chat />)}

      <div className="flex justify-center">
        <PopUp />
      </div>
      <div className="flex">
        {isSidebarOpen && <SideBar />}
        {memoizedRoutes}
      </div>
    </>
  )
}

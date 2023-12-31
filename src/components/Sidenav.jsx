import { NavLink } from "react-router-dom";
import { useState } from "react";
import { NewPost } from "./NewPost";
import { useAuth } from "../context/auth-context";

export const Sidenav = () => {
  const { authState } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const getStyles = ({ isActive }) => ({
    backgroundColor: isActive ? "#377dff" : "",
    borderRadius: isActive ? "10px" : "",
    color: isActive ? "white" : "",
  });

  return (
    <>
      {showModal && (
        <NewPost showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className="bg-white px-4 pr-3 pt-5 text-left md:text-center min-h-screen fixed w-[15%] xl:text-[14px] lg:px-2 lg:text-[16px] md:flex md:justify-evenly md:w-full md:min-h-0 md:bottom-0 md:z-30 md:pt-2.5 md:py-1 md:pb-3.5 xs:text-sm dark:bg-dark-mode dark:text-white">
        <NavLink
          style={getStyles}
          className="block py-4 cursor-pointer md:px-5 md:py-2 xs:px-2 hover:text-primary-color pl-10 xl:pl-5 md:text-xs"
          to="/"
        >
        
          <span className="font-medium md:block">Feed</span>
        </NavLink>
        <NavLink
          style={getStyles}
          className="block py-4 cursor-pointer md:py-2 md:px-5 xs:px-2 hover:text-primary-color pl-10 xl:pl-5 md:text-xs"
          to="/explore"
        >
        
          <span className="font-medium md:block">Explore</span>
        </NavLink>

        <p
          onClick={() => setShowModal(true)}
          className="hidden py-4 cursor-pointer md:block md:py-2 md:px-5 xs:px-2 hover:text-primary-color pl-10 xl:pl-5 md:text-xs"
        >
          <span className="ml-3 font-medium md:block">Create Post</span>
        </p>
        <NavLink
          style={getStyles}
          className="relative block py-4 cursor-pointer md:py-2 md:px-5 xs:px-2 hover:text-primary-color pl-10 xl:pl-5 md:text-xs"
          to="/bookmark"
        >
     
          <span className="font-medium md:block">Bookmarks </span>
        </NavLink>

        <NavLink
          style={getStyles}
          className="relative block py-4 cursor-pointer md:py-2 md:px-5 xs:px-2 hover:text-primary-color pl-10 xl:pl-5 md:text-xs"
          to={`/profile/${authState?.user?.username}`}
        >
      
          <span className="font-medium md:block">Profile </span>
        </NavLink>

        <p
          onClick={() => setShowModal(true)}
          className="block py-4 cursor-pointer md:hidden md:py-2 md:px-5 xs:px-2 hover:text-primary-color pl-10 xl:pl-5 md:text-xs"
        >
     
          <button className="font-medium md:block">Create Post</button>
        </p>
      </div>
    </>
  );
};

import React from "react";
import "./leftSidebar.css";
export const LeftSidebar = () => {
  return (
    <div className="left-sidebar-container">
      <div className="navigation">
        <ul>
          <li>Home</li>
          <li>Explore</li>
          <li>Bookmarks</li>
          <li>Profile</li>
        </ul>
        <button>Create new post</button>
      </div>

      <div className="profile">
        Profile
      </div>
    </div>
  );
};

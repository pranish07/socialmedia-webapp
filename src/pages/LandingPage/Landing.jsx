import React from "react";
import "./landing.css"

export const Landing = () => {
  return (
    <div>
      <div className="container">
        <div className="left-col">
          <h1>My Website</h1>
          <div>
            <p>Follow people around the globe</p>
            <p>Connnect people around the globe</p>
            <p>Share people around the globe</p>
          </div>
          <div className="buttons">
          <button>Join Now</button>
          <a href="/">Already have an account</a>
          </div>
        </div>
        <div className="right-col"></div>
      </div>
    </div>
  );
};

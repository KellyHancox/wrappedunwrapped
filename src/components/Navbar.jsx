import React from 'react'
import { Link } from "react-router-dom";

function NavBar() {

    return <div className="navBar">
  
      <Link to="/">
        <span className="logo">
          Wrapped Unwrapped
        </span>
      </Link>
  
        <span>
          <a href="https://accounts.spotify.com/en/logout">
            <button className="logoutButton">Log out</button>
          </a>
        </span>
  
    </div>
  }

  export default NavBar;
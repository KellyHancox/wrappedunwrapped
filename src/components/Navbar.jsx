import React from 'react'
import { Link } from "react-router-dom";

function NavBar() {

    return <div className="navBar">
  
  <div>
      <Link to="/">
        <span className="logo">
          Wrapped Unwrapped
        </span>
      </Link>
      </div>
  
      <div>
        <span>
          <a href="https://accounts.spotify.com/en/logout">
            <button className="logoutButton">Log out</button>
          </a>
        </span>
        </div>
  
    </div>
  }

  export default NavBar;
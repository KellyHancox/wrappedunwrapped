import React from 'react';
import NavBar from './Navbar.jsx';

function TopTenPage({artistNameImageDivs, trackNameImageDivs, genreArray}) {

    return (
      <div >
        <NavBar/>
  
        <div className="topTenPage">
        <span className="words">Top artists of all time:</span> 
  
        <div className="albumHolder">
          { artistNameImageDivs }
        </div>
  
        <div className="words">Top tracks of all time:</div> 
        <div className="albumHolder">
          { trackNameImageDivs }
        </div>
  
        <div className="words">Top 10 genres based on artists:</div> 
        <div className="albumHolder">
          { genreArray }
        </div>
  
        </div>
  
      </div>)
  }

  export default TopTenPage;
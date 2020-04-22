import React from 'react';
import NavBar from './Navbar.jsx';
import '../App.css';

function Comparisons({artistComparisonDivs, trackComparisonDivs, genreComparisonDivs, isVisible}) {

    return (isVisible ? 
      <div >
        <NavBar></NavBar>
  
        <div className="topTenPage">
        <span className="words">Top Compared Artists:</span> 
  
        <div className="albumHolder">
          { artistComparisonDivs.length === 0? "None found" : artistComparisonDivs}
        </div>
  
        <div className="words">Top Compared Tracks:</div> 
        <div className="albumHolder">
          { trackComparisonDivs.length === 0? "None found" : trackComparisonDivs }
        </div>
  
        <div className="words">Top Compared Genres:</div> 
        <div className="albumHolder">
          { genreComparisonDivs.length === 0? "None found" : genreComparisonDivs }
        </div>
  
        </div>
  
      </div> : "")
  }

  export default Comparisons;
import React from 'react';
import {Link} from 'react-router-dom';

function Users({userPictures, userNames, compareUsers}) {
  
    var userArray = []
  
    for (var i = 0; i < userPictures.length; i++) {
      var div = <div className="profileNameImageHolder" key={i}><img className="userImage" id={i} src={userPictures[i]} alt="profilePic" onClick={event => compareUsers(event)} /><div className="artistName">{userNames[i]}</div></div>
      userArray.push(div)
    }
     
    return <div className="users">
        
        <div className="words">Compare with an existing User:</div>
        <div className="albumHolder">
          <Link to="/comparisons">
            { userArray }
          </Link>
        </div>
  
      </div>
  }

  export default Users;
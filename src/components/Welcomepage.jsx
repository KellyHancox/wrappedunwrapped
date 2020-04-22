import React from 'react';
import '../App.css';

function WelcomePage() {

    return <div className="loginSurrounded">
      <div className="title"> Wrapped Unwrapped</div>
  
        <a href='http://localhost:8888/login'>
        {/* https://accounts.spotify.com/authorize?response_type=code&client_id=2549551b284f4c82ac02f81c79575625&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback*/}
          <button className="loginButton">Sign in</button>
        </a>
        </div>
  }

export default WelcomePage;
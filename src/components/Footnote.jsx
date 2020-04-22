import React from 'react';
import '../App.css';

function Footnote({saveInformation}) {

    return <div className="footnote">
        <span>
            <button className="saveButton" onClick={event => saveInformation()}>Save my information</button>
        </span>
    </div>
  }

  export default Footnote;
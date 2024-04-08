// import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
// import Switch from 'react-router';
//couldn't figure out this stuff
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import MainPage from './components/MainPage/MainPage';
// import AboutPage from './components/AboutPage/AboutPage';

function App() {
  //this makes it so we have present state of text box at all times
  const [providedLink, setProvidedLink] = useState('');

  /**When enter is pressed, act as though submit button was pressed
   * If input area is selected, do not linebreak 
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter"){
      e.preventDefault();
      getReviews();
    }
  }

  /**Sends requests to APIs to handle the backend work, and displays the response */
  const getReviews = () => {
    /* send request to backend to use yelp api, NLP etc 
    *
    *               TODO CONFIGURE WITH BACKEND 
    * *
    * ================================================*/
    console.log("getting reviews for ", providedLink);

    /* get  response from backend and update display
    *
    *               TODO CONFIGURE WITH BACKEND 
    * *
    * ================================================*/
    let response = "(DEFAULT RESPONSE): overall everyone hates this "
    updateResponseDisplay(response);
  };
  
  /**Fills in summary from backend onto the display */
  const updateResponseDisplay = (response) => {

    document.getElementsByClassName("response-display")[0].textContent = response;

  }

  return (
    <div className="MainApp">
      
      {/*background*/}
      <div className="App-background"></div>
      
      {/*input area, label, and button*/}
      <div className="input-area-container">
        <label style={{color: 'white'}} htmlFor="link-input-space">Enter your link here:</label>
        <br></br>
        
        <textarea 
          value={providedLink} 
          onChange={(e) => setProvidedLink(e.target.value)} 
          onKeyDown={handleKeyDown}
          placeholder = "enter text here..."
          id="link-input-space" 
          name="link-input-space" 
          rows="2" 
          cols="50"/>
        <br></br>
        
        <button id="submit-button" onClick = {getReviews}>Get reviews</button>
      </div>

      {/*response display*/}
      <div className = "response-display"></div>

    </div>

  );
}

export default App;


        // {/* <a
        //   className="App-link"
        //   href="https://reactjs.org"
        //   target="_blank"
        //   rel="noopener noreferrer"
        // >
        //   Learn React
        // </a>
        //  */}

      //    <p>
      //    Edit <code>src/App.js</code> and save to reload.
      //  </p>

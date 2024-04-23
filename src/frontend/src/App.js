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
  
  /**updates display with the data from the api
   * 
   * @param {JSON} response 
   */
  const updateResponseDisplay = (response) => {
    /* get  response from backend and update display
    *
    *               TODO MAKE THIS THE ACTUAL RESPONSE
    * *
    * ================================================*/
    let default_response = 
    {
      "avg_rating": 4.6,
      "avg_sentiment": 3.29899999499321,
      "emoji": "😀",
      "place": "Shady Grove",
      "reviews": []
    }
    let display = `${default_response["emoji"]}\n\n This place, ${default_response["place"]}, received an average rating of ${default_response["avg_rating"]}
    and an average sentiment of ${default_response["avg_sentiment"]}. Here are the reviews: \n`;
    for(let review of default_response["reviews"]){
      display += review;
      display += '\n';
    }

    document.getElementsByClassName("response-display")[0].textContent = display;

  }

  return (
    <div className="MainApp">
      <header className="App-header">
        <h1>Review Sentiment Analyzer</h1>
        <p>Enter the Yelp link below to get sentiment analysis on reviews.</p>
      </header>
      
      {/*background*/}
      
      
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


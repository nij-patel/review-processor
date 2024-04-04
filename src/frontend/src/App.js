// import logo from './logo.svg';
import './App.css';
import path_to_architecture_pic from "./Assets/images/architecture-diagram.PNG"
function App() {
  console.log("loading app");
  // let img = document.createElement("img");
  
  return (
    <div className="App">
      <header className="App-header">
        <img src= {path_to_architecture_pic} id= "architecture" alt=""/>
        <h style = {{zIndex: 3, color: 'red'}}> text  </h>
      </header>
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

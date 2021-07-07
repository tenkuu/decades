import logo from './logo.svg';
import './App.css';

// To test the connection
import React, {useState, useEffect} from 'react'
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('/api/hello')
      .then(res => setState(res.data))
  }, [])

  const [state, setState] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Server call (v.6): {state}</p>
      </header>
    </div>
  );
}

export default App;

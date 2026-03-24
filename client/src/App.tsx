import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [serverData, setServerData] = useState("Loading...");

  useEffect(() => {
    // Fetching from your Express port
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => setServerData(data.message))
      .catch(err => setServerData("Failed to connect to backend"));
  }, []);

  return (
    <div className="App">
      <h1>React + Express</h1>
      <div className="card">
        <p>Message from Backend: <strong>{serverData}</strong></p>
      </div>
    </div>
  )
}

export default App
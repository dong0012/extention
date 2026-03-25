import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container">
      <header>
        <h1>ZenTab</h1>
        <p className="subtitle">Focus & Clarity</p>
      </header>
      
      <main>
        <div className="clock-card">
          <span className="time">{time}</span>
        </div>
        
        <div className="actions">
          <button className="btn-primary">Focus Mode</button>
          <button className="btn-secondary">Quick Note</button>
        </div>
      </main>

      <footer>
        <p>© 2026 ZenTab Premium</p>
      </footer>
    </div>
  )
}

export default App

console.log('ZenScroll: Content script LOADED at top level');
import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

const FloatingScroll = () => {
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight / 2 })
  const [isDragging, setIsDragging] = useState(false)
  const offset = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offset.current.x,
          y: e.clientY - offset.current.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const scrollUp = () => {
    window.scrollBy({ top: -300, behavior: 'smooth' })
  }

  const scrollDown = () => {
    window.scrollBy({ top: 300, behavior: 'smooth' })
  }

  return (
    <div 
      className="zen-scroll-root"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <button className="scroll-btn up" onClick={(e) => { e.stopPropagation(); scrollUp(); }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
      <div className="drag-handle">⋮⋮</div>
      <button className="scroll-btn down" onClick={(e) => { e.stopPropagation(); scrollDown(); }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  )
}

const rootDiv = document.createElement('div')
rootDiv.id = 'zen-scroll-container'
document.body.appendChild(rootDiv)

ReactDOM.createRoot(rootDiv).render(
  <React.StrictMode>
    <FloatingScroll />
  </React.StrictMode>
)

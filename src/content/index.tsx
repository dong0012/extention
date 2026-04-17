console.log('ZenScroll: Content script LOADED at top level');
import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

const FloatingScroll = () => {
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight / 2 })
  const [isDragging, setIsDragging] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [showBottom, setShowBottom] = useState(false)
  const offset = useRef({ x: 0, y: 0 })
  const widgetRef = useRef<HTMLDivElement>(null)
  const scrollTimer = useRef<number | null>(null)
  const scrollDelayTimer = useRef<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = window.innerHeight
      
      // Show "Back to Top" when scrolled down (leaving the top)
      const canGoUp = scrollTop > 300
      setShowTop(canGoUp)

      // Show "Scroll to Bottom" when not yet at bottom (at least 300px or 1% left)
      const scrollBottom = scrollTop + clientHeight
      const canGoDown = scrollBottom < Math.max(scrollHeight - 300, scrollHeight * 0.99)
      setShowBottom(canGoDown)
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Adjust position when "Back to Top" button appears/disappears to keep other buttons fixed
  const isMounted = useRef(false)
  useEffect(() => {
    if (!isMounted.current) {
      // On initial mount, if showTop is true, we should have already started with an offset
      // or we adjust it now. Since position is initialized to mid-screen, 
      // let's shift it once if it starts with showTop.
      if (showTop) {
        setPosition(prev => ({ ...prev, y: prev.y - 20 })) // Half-shift for focus
      }
      isMounted.current = true
      return
    }

    const shift = 40 // Height of button (32px) + margin (8px)
    setPosition(prev => ({
      ...prev,
      y: showTop ? prev.y - shift : prev.y + shift
    }))
  }, [showTop])

  const startScrolling = (direction: 'up' | 'down') => {
    const amount = direction === 'up' ? -50 : 50;
    
    // Perform initial scroll
    window.scrollBy({ top: amount * 2, behavior: 'smooth' });

    // Wait 400ms before starting continuous scroll
    scrollDelayTimer.current = window.setTimeout(() => {
      scrollTimer.current = window.setInterval(() => {
        window.scrollBy({ top: amount, behavior: 'auto' });
      }, 50);
    }, 400);
  }

  const stopScrolling = () => {
    if (scrollDelayTimer.current) {
      window.clearTimeout(scrollDelayTimer.current);
      scrollDelayTimer.current = null;
    }
    if (scrollTimer.current) {
      window.clearInterval(scrollTimer.current);
      scrollTimer.current = null;
    }
  }

  useEffect(() => {
    return () => stopScrolling();
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && widgetRef.current) {
        const { offsetWidth, offsetHeight } = widgetRef.current;
        const newX = Math.max(0, Math.min(e.clientX - offset.current.x, window.innerWidth - offsetWidth));
        const newY = Math.max(0, Math.min(e.clientY - offset.current.y, window.innerHeight - offsetHeight));
        
        setPosition({
          x: newX,
          y: newY
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

  useEffect(() => {
    const handleResize = () => {
      if (widgetRef.current) {
        const { offsetWidth, offsetHeight } = widgetRef.current;
        setPosition(prev => ({
          x: Math.max(0, Math.min(prev.x, window.innerWidth - offsetWidth)),
          y: Math.max(0, Math.min(prev.y, window.innerHeight - offsetHeight))
        }))
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  return (
    <div 
      ref={widgetRef}
      className={`zen-scroll-root ${showTop ? 'has-top' : ''}`}
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      {showTop && (
        <button 
          className="scroll-btn top-btn" 
          onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          title="Back to Top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 19V5M12 5l-7 7m7-7l7 7" />
            <path d="M5 4h14" />
          </svg>
        </button>
      )}
      <button 
        className="scroll-btn up" 
        onMouseDown={(e) => { e.stopPropagation(); startScrolling('up'); }}
        onMouseUp={(e) => { e.stopPropagation(); stopScrolling(); }}
        onMouseLeave={(e) => { e.stopPropagation(); stopScrolling(); }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
      <div className="drag-handle">⋮⋮</div>
      <button 
        className="scroll-btn down" 
        onMouseDown={(e) => { e.stopPropagation(); startScrolling('down'); }}
        onMouseUp={(e) => { e.stopPropagation(); stopScrolling(); }}
        onMouseLeave={(e) => { e.stopPropagation(); stopScrolling(); }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {showBottom && (
        <button 
          className="scroll-btn bottom-btn" 
          onClick={(e) => { 
            e.stopPropagation(); 
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }); 
          }}
          title="Scroll to Bottom"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M12 19l7-7m-7 7l-7-7" />
            <path d="M5 20h14" />
          </svg>
        </button>
      )}
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

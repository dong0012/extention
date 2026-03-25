import './App.css'

function App() {
  return (
    <div className="container">
      <header>
        <h1>ZenScroll</h1>
        <p className="subtitle">网页滚动控制器</p>
      </header>
      
      <main>
        <div className="status-card">
          <p>✅ 控制器已注入页面</p>
          <p className="hint">在任意网页右侧即可看到悬浮条</p>
        </div>
      </main>

      <footer>
        <p>© 2026 ZenScroll</p>
      </footer>
    </div>
  )
}

export default App

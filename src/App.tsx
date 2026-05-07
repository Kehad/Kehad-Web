import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './app/page'
import AboutPage from './app/about/page'
import BlogPage from './app/blog/page'
import UsesPage from './app/uses/page'
import ProjectPage from './app/projects/[slug]/page'
import NotFoundPage from './app/not-found'
import CustomCursor from './components/others/CustomCursor'
import Header from './components/home/Header'

function App() {
  return (
    <Router >
      <div className="w-full h-[100dvh] bg-[#0B0F19] text-white relative flex flex-col font-sans overflow-x-hidden overflow-y-auto transition-colors duration-500 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)]"
      style={{ backgroundSize: "48px 48px" }}>

      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        {/* <Route path="/uses" element={<UsesPage />} /> */}
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <CustomCursor />
      </div>

    </Router>
  )
}

export default App

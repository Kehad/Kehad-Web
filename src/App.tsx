import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './app/page'
import AboutPage from './app/about/page'
import BlogPage from './app/blog/page'
import UsesPage from './app/uses/page'
import ProjectPage from './app/projects/[slug]/page'
import NotFoundPage from './app/not-found'
import CustomCursor from './components/others/CustomCursor'
import Header from './components/home/Header'
import LaptopFrame from './components/others/LaptopFrame'

function App() {
  return (
    <Router>
      <LaptopFrame>
        <div
          className="w-full h-full bg-[#0B0F19] text-white relative flex flex-col font-sans overflow-x-hidden transition-colors duration-500 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)]"
          style={{ backgroundSize: "48px 48px" }}
        >
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
      </LaptopFrame>
    </Router>
  )
}

export default App

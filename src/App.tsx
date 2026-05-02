import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './app/page'
import AboutPage from './app/about/page'
import BlogPage from './app/blog/page'
import UsesPage from './app/uses/page'
import ProjectPage from './app/projects/[slug]/page'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/uses" element={<UsesPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </Router>
  )
}

export default App

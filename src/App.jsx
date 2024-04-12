// import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.jsx';
import Layout from './components/layout/layout.jsx';
import Nav from './components/sidebar/nav';

function App() {
  return (
    <>
      <Layout>
        <Header />
        <div className="grid  grid-cols-column gap-28 mt-16">
          <div className="">
            <Nav />
          </div>
          <div className="flex-1 bg-red-700">
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/home" element={<Home />} /> */}
              {/* <Route path="/about-me" element={<AboutMe />} /> */}
              {/* <Route path="/skills" element={<Skills />} /> */}
              {/* <Route path="/works" element={<Works />} /> */}
              {/* <Route path="/side-project" element={<Project />} /> */}
              {/* <Route path="/contact-me" element={<Contact />} /> */}
              {/* <Route path="*" element={<Home />} /> */}
            </Routes>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;

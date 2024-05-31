// import { useState } from 'react';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AboutMe from './components/aboutme/about-me';
import Contact from './components/contact/contact';
import Header from './components/header/header.jsx';
import Home from './components/home/home';
import Layout from './components/layout/layout.jsx';
import Backdrop from './components/others/backDrop';
import Project from './components/project/project';
import Nav from './components/sidebar/nav';
import NavMobile from './components/sidebar/navMobile';
import Skills from './components/skills/skills';
import Works from './components/works/works';

function App() {
  const [inMenu, setInMenu] = useState(false);

  const menuHandler = (menuActive) => {
    console.log(menuActive);
    setInMenu(menuActive);
  };

  return (
    <div>
      {inMenu && <Backdrop />}
      <Layout>
        <Header menuActive={menuHandler} />
        <div className="grid lg:grid-cols-column md:grid-cols-columnMd gap-15 mt-16">
          <div className="">
            <Nav />
            {/* <NavMobile navStatus={menuHandler} /> */}
          </div>
          <div className="flex-1 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/works" element={<Works />} />
              <Route path="/side-project" element={<Project />} />
              <Route path="/contact-me" element={<Contact />} />
              {/* <Route path="*" element={<Home />} /> */}
            </Routes>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default App;

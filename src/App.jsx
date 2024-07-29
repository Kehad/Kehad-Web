// import { useState } from 'react';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import AnimatedRoutes from './components/AnimatedAppRoute.jsx';
import Backdrop from './components/others/backDrop.jsx';
import Layout from './components/layout/layout.jsx';
import Header from './components/header/header.jsx';
import Nav from './components/sidebar/nav.jsx';

function App() {
  // const [inMenu, setInMenu] = useState(false);
  // const menuHandler = (menuActive) => {
  //   // console.log('menuHandler');
  //   console.log(menuActive);
  //   setInMenu(menuActive);
  // };

  const inMenu = useSelector((state) => state.menu.menuState);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /about after 2 seconds
    navigate('/home');
    // Clean up the timer
  }, []);
  // console.log('App');

  // console.log(inMenu);

  return (
    <div>
      {/* {inMenu && <Backdrop menuActive={menuHandler} menu={inMenu} />} */}
      {inMenu && <Backdrop />}
      <Layout>
        {/* <Header menuActive={menuHandler} /> */}
        <Header />
        <div className="grid lg:grid-cols-column md:grid-cols-columnMd gap-15 mt-16">
          <div className="">
            <Nav />
            {/* <NavClone /> */}
            {/* <NavMobile navStatus={menuHandler} /> */}
          </div>
          <div className="flex-1 ">
            <AnimatedRoutes />
            {/* <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/works" element={<Works />} />
              <Route path="/side-project" element={<Project />} />
              <Route path="/contact-me" element={<Contact />} />
            </Routes> */}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default App;

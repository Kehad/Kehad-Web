import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuHandler } from '../../redux/menuSlice';

const Backdrop = function (props) {
  // const [inMenu, setInMenu] = useState(props.menu);
  // console.log(inMenu);
  // const downloadOptions = (event) => {
  //   event.preventDefault();
  //   console.log(inMenu);
  //   // setInMenu((inMenu) => !inMenu);
  //   setInMenu(false);
  // };
  // console.log(inMenu);
  // props.menuActive(inMenu);

  const isMenu = useSelector((state) => state.menu.menuState);
  const dispatch = useDispatch();

  return (
    <div
      className="fixed inset-0 w-full h-full z-80 bg-black bg-opacity-75 z-10"
      // onClick={downloadOptions}
      // onClick={dispatch(menuHandler(false))}
    ></div>
  );
};

export default Backdrop;

import { useState } from 'react';

const Backdrop = function (props) {
  const [inMenu, setInMenu] = useState(false);

  const downloadOptions = () => {
    console.log(inMenu);
    setInMenu((inMenu) => !inMenu);
    // setInMenu(false);
  };
  props.menuActive(inMenu);

  return (
    <div
      className="fixed inset-0 w-full h-full z-80 bg-black bg-opacity-75 z-10"
      onClick={downloadOptions}
    ></div>
  );
};

export default Backdrop;

import React from 'react';
import Typed from 'typed.js';

function AutoType(props) {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [props.name],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <span
      style={{
        color: '#07C51A',
      }}
      className="text-gray-200 font-Judson  font-normal mt-0.5 mb-0.7 text-[2rem] lg:text-3xl cursor"
      ref={el}
    />
  );
}

export default AutoType;

"use client"
import React from 'react';

import Typed from 'typed.js';

function AutoType(props: { strings: string[], className?: string, loop?: boolean }) {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: props.strings,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: props.loop !== undefined ? props.loop : true,
      showCursor: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [props.strings, props.loop]);

  return (
    <span className={props.className} ref={el} />
  );
}

export default AutoType;
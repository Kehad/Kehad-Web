/* eslint-disable react/prop-types */
import { useState } from 'react';
// import classes from './notify.module.css';
// import Not from './not';

const Notify = function (props) {
  const { head, text } = props;
  const [isCancel, setIsCancel] = useState(false);

  const cancelHandler = (event) => {
    event.preventDefault();

    setIsCancel(true);
  };
  const notify = (
    <div className="rounded-10 md:py-4 md:px-8 inline-block absolute top-[-40px] right-[0]">
      <div className="flex items-center justify-between border-b border-solid text-2xl  px-4 min-w-12 bg-success">
        <strong className="me-auto text-[0.9rem] md:text-2xl">{head}</strong>
        <small className="text-xl lg:text-3xl cursor-pointer " onClick={cancelHandler}>
          X
        </small>
      </div>
      <div className="p-1.5 text-base bg-primary text-[0.7rem] md:text-xl">
        {text}
      </div>
    </div>
  );

  return <>{!isCancel ? notify : ''}</>;
};

export default Notify;

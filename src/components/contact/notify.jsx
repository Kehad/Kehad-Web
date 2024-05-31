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
    <div className="rounded-10 py-4 px-8 inline-block absolute top-24 right-10">
      <div className="flex items-center justify-between border-b border-solid text-2xl  px-4 min-w-12 bg-success">
        <strong className="me-auto">{head}</strong>
        <small className="text-3xl cursor-pointer" onClick={cancelHandler}>
          X
        </small>
      </div>
      <div className="p-1.5 text-base bg-primary">{text}</div>
    </div>
  );

  return <>{!isCancel ? notify : ''}</>;
};

export default Notify;

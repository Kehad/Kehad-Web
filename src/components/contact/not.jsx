import { useState } from 'react';
// import classes from './not.module.css';

const Not = function (props) {
  const [isCancel, setIsCancel] = useState(false);

  const cancelHandler = (event) => {
    event.preventDefault();

    setIsCancel(true);
  };
  return (
    <div className="rounded-10 py-4 px-8 inline-block absolute top-24 right-10">
      <div className="flex items-center justify-between border-b border-solid text-2xl bg-error px-4 min-w-12 ">
        <strong className="me-auto">Failure</strong>
        <small className="cursor-pointer" onClick={cancelHandler}>
          X
        </small>
      </div>
      <div className="p-1.5 text-base bg-red-500">
        This idjdgysdgsydfydfsydfys
      </div>
    </div>
  );
};

export default Not;

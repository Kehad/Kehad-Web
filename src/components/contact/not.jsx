/* eslint-disable react/prop-types */
import { useState } from 'react';

const Not = function (props) {
  const { head, text } = props;
  const [isCancel, setIsCancel] = useState(false);

  const cancelHandler = (event) => {
    event.preventDefault();

    setIsCancel(true);
  };
  return (
    <div className="rounded-10 py-4 px-8 inline-block absolute top-[-70px] right-[-25px]">
      <div className="flex items-center justify-between border-b border-solid text-2xl bg-error px-4 min-w-12 ">
        <strong className="me-auto text-[0.9rem] md:text-xl ">{head}</strong>
        <small
          className="text-xl lg:text-3xl cursor-pointer"
          onClick={cancelHandler}
        >
          X
        </small>
      </div>
      <div className="p-1.5 text-[0.8rem] bg-red-500 w-[12rem] ">{text}</div>
    </div>
  );
};

export default Not;

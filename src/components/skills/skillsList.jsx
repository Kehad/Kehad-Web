/* eslint-disable react/prop-types */
// import classes from "./skillsList.module.css";

const SkillsList = function (props) {
  return (
    <div className="flex justify-between items-center rounded-full lg:w-9/12 sm:w-[90%] sm:py-[0.7rem] sm:px-4 lg:py-[0.6rem] lg:px-8 bg-sup dark:bg-black">
      <p className="font-judson sm:text-2xl lg:text-3xl text-primary font-bold ml-6">
        {props.name}
      </p>
      <div className="flex items-center justify-center mr-6 sm:h-4">
        {props.link}
      </div>
    </div>
  );
};

export default SkillsList;

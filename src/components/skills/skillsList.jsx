/* eslint-disable react/prop-types */
// import classes from "./skillsList.module.css";

const SkillsList = function (props) {
  return (
    <div className="flex justify-between items-center rounded-full h-20  w-9/12 bg-sup dark:bg-black">
      <p className="font-judson text-3xl text-primary font-bold ml-6">
        {props.name}
      </p>
      <div className="flex items-center justify-center      mr-6">
        {props.link}
      </div>
    </div>
  );
};

export default SkillsList;

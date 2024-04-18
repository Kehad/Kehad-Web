/* eslint-disable react/prop-types */
// import classes from "./skillsList.module.css";

const SkillsList = function (props) {
  return (
    <div className="flex justify-between align-center rounded-full px-8 py-2  w-9/12">
      <p className="font-judson text-2xl text-primary font-bold">
        {props.name}
      </p>
      <div className="flex items-center justify-center bg-green-800 text-gray-100 border border-gray-700 border-l-4 rounded-l-lg py-2 px-8 mr-6">
        {props.link}
      </div>
    </div>
  );
};

export default SkillsList;

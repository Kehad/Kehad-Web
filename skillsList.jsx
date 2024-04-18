import classes from "./skillsList.module.css";

const SkillsList = function (props) {
  return (
    <div className={classes.skillsList}>
      <p className={classes["skillsList__name"]}>{props.name}</p>
      <div className={classes["skillsList__box---img"]}>
        {props.link}
      </div>
    </div>
  );
};

export default SkillsList;

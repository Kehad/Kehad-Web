import React from "react";

import classes from "./buttonType.module.css";

const ButtonType2 = function (props) {
  return (
    <div className={classes["button-type2"]}>
      <div className={classes["button--type2__link---box"]}>
        <a
          href={props.link}
          onClick={props.action}
          className={classes["button--type2__profile"]}
        >
          {props.name}
        </a>
      </div>
    </div>
  );
};

export default ButtonType2;

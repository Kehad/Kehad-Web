

import classes from "./buttonSend.module.css";
import { Link } from "react-router-dom";

const ButtonSend = function (props) {
  return (
    <div className={classes.buttonsend}>
      <div className={classes.buttonSendLinkBox}>
        <Link
          to={props.to}
          onClick={props.action}
          className={classes.buttonSendProfile +  ' ' + props.newClass}
          disable={props.disable}
        >
          {props.name}
        </Link>
      </div>
    </div>
  );
};

export default ButtonSend;

import { Fragment } from "react";
import classes from "../../styles/button.module.css";
import { BsCheck2 } from "react-icons/bs";

function Button(props){
  const { label, onChange, checked, value } = props;
 
  return (
    <Fragment>
      <input
        className={classes.input}
        checked={checked}
        value={value}
        onChange={onChange}
        type="checkbox"
        name={"status"}
        id={label}
      />
      <label className={`${classes.label} ${checked ? classes.show : classes.hidden}`} htmlFor={label}>
        <BsCheck2 className={`${classes.icon} ${checked ? classes.show : classes.hidden}`}/>
        {label}

      </label>
      
    </Fragment>
  );
};

export default Button;

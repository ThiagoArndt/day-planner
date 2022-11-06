import classes from "../../styles/main-header.module.css";
import { Fragment } from "react";
function MainHeader() {
  const date = new Date();

  //Format the date of main header component
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const slicedMonth = month.slice(0, 3);

  return (
    <Fragment>
      <div className={classes.content}>
        <div className={classes.datesContainer}>
          <h2 classes={classes.day}>{day}</h2>

          <div className={classes.dateWrapper}>
            <h5>
              <span className={classes.month}>{slicedMonth}</span>
              <span className={classes.year}>{year}</span>
            </h5>
          </div>
        </div>
        <div className={classes.dayWritten}>
          <h4>{weekday}</h4>
        </div>
      </div>
    </Fragment>
  );
}

export default MainHeader;

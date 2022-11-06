import { Fragment } from "react";
import classes from "../../styles/layout.module.css";

function Layout(props) {
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </Fragment>
  );
}

export default Layout;

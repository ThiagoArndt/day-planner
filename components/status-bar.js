import classes from "../styles/status-bar.module.css";
import NotificationContext from "../store/notification-context";
import { useContext } from "react";

function StatusBar(props) {
  const notificationCtx = useContext(NotificationContext);

  return (
    <div className={classes.container}>
      <div
        className={classes.filler}
        style={{ width: `${notificationCtx.completedValue}%` }}
      >
      </div>
    </div>
  );
}

export default StatusBar;

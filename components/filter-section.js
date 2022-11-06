import classes from "../styles/filter-section.module.css";
import { Fragment, useState, useEffect, useContext } from "react";
import Button from "./ui/button";
import SearchBar from "./ui/searchBar";
import NotificationContext from "../store/notification-context";

function FilterSection(props) {
  const notificationCtx = useContext(NotificationContext);

  const [checked, setChecked] = useState("null");

  //Send button status to context
  useEffect(() => {
    notificationCtx.setStatus(checked);
  }, [checked]);



  //Change button status
  function toggleHandler(event) {
    setChecked((current) =>
      current === event.target.value ? "null" : event.target.value
    );
  }



  //Set button status to null when clear filter function is called
  useEffect(() => {
    setChecked("null");
  }, [notificationCtx.isFilterCleared]);


  
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.checkGroup}>
          <Button
            label={"Done"}
            value={"Done"}
            onChange={toggleHandler}
            checked={checked === "Done"}
          />
          <Button
            label={"Pending"}
            value={"Pending"}
            onChange={toggleHandler}
            checked={checked === "Pending"}
          />
        </div>
        <div className={classes.searchBar}>
          <SearchBar />
        </div>
      </div>
    </Fragment>
  );
}

export default FilterSection;

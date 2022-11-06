import Item from "./item";
import classes from "../styles/item-list.module.css";
import { Fragment, useEffect, useRef, useState, useContext } from "react";
import NotificationContext from "../store/notification-context";
import React from "react";

function ItemList() {
  const notificationCtx = useContext(NotificationContext);

  const [data, setData] = useState([]);

  const [items, setItems] = useState([]);



//Get list of items
  useEffect(async () => {
    await fetch("/api/chores")
      .then((response) => response.json())
      .then((data) => {
        setData(data.chores);
        notificationCtx.setIsLoading(false);
      });
  }, [notificationCtx.isShowing]);



//Filter list of items according to the button selected and updates status bar percentage
  useEffect(() => {
    //Status bar is updated here
    const doneItems = data.filter((event) => event.isDone === true);
    const doneItemsLength = doneItems.length;

    const itemsLength = data.length;
    const completedMath = Math.floor((doneItemsLength / itemsLength) * 100);

    notificationCtx.setCompletedValue(completedMath);



    //Filtering happens here
    if (notificationCtx.status === "Done") {
      const doneItems = data.filter((event) => event.isDone === true);
      setItems(doneItems);
      return;

    } else if (notificationCtx.status === "Pending") {
      const pendingItems = data.filter((event) => event.isDone === false);
      setItems(pendingItems);
      return;

    } else if (notificationCtx.status === "null") {
      setItems(data);
      return;
    }
  }, [notificationCtx.status, notificationCtx.isLoading]);



//Filters the list of items according to search bar input
  const filteredData = items.filter((el) => {
    if (notificationCtx.inputText === "") {
      return el;
    } else {
      return el.title.toLowerCase().includes(notificationCtx.inputText);
    }
  });




  const [emptyMessage, setEmptyMessage] = useState("");

  //Set a message if list of items returns empty
  useEffect(() => {
    if (notificationCtx.inputText !== "") {
      setEmptyMessage("Your search found no results. ");
    } else if (notificationCtx.status === "Pending") {
      setEmptyMessage("There are no items marked as pending. ");
    } else if (notificationCtx.status === "Done") {
      setEmptyMessage("There are no items marked as done. ");
    }
  }, [notificationCtx.inputText, notificationCtx.status]);



  const [isListEmpty, setIsListEmpty] = useState();

  //Check if list has no items
  useEffect(() => {
    if (filteredData.length === 0) {
      setIsListEmpty(true);
    } else {
      setIsListEmpty(false);
    }
  }, [filteredData]);



  //Trigger useEffect to clear search input and button status 
  function clearFilterHandler() {
    notificationCtx.setIsFilterCleared((prevStatus) => !prevStatus)
  }

  return (
    <div>
      {!notificationCtx.isLoading && isListEmpty && data.length > 0 ? (
        <p>{emptyMessage}<u style={{ cursor: "pointer" }} onClick={clearFilterHandler}>Clear the filter here</u> to see all items.</p>) : 
        (!notificationCtx.isLoading && data.length === 0 && <p>There are no items in the list.</p>)}
      {!notificationCtx.isLoading && (
        <div>
          <div className={classes.container}>
            <ul className={classes.list}>
              {filteredData.map((event) => (
                <Item
                  key={event._id}
                  id={event._id}
                  isDone={event.isDone}
                  title={event.title}
                />
              ))}
            </ul>
          </div>
        </div>
      )}

      {notificationCtx.isLoading && <p>Loading...</p>}
    </div>
  );
}

export default ItemList;

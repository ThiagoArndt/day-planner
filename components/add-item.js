import { Fragment } from "react";
import classes from "../styles/add-item.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState, useRef, useEffect, useContext } from "react";
import { TextareaAutosize } from "@mui/material";
import NotificationContext from "../store/notification-context";

function AddItem() {
  const [userInputValue, setUserInputValue] = useState();


  //Get the user input length on the add item component
  function userInputHandler(event) {
    setUserInputValue(event.target.value.length);
  }



  const [isIconActive, setIsIconActive] = useState(false);

  //Make the add item icon active when user input length is more than one character
  useEffect(() => {
    if (userInputValue > 0) {
      setIsIconActive(true);
    } else {
      setIsIconActive(false);
    }
  });



  const notificationCtx = useContext(NotificationContext);

  const addItemRef = useRef();

  //Trigger API post method
  async function addItemHandler(event) {
    event.preventDefault();

    notificationCtx.setIsLoading(true);

    const title = addItemRef.current.value;

    const itemData = {
      title: title,
      isDone: false,
    };

    addItemRef.current.value = ""; //Clear user input when adding icon is triggered
    setIsIconActive(false);        //Set icon state to unactivated

    await fetch("/api/chores", {
      method: "POST",
      body: JSON.stringify(itemData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else{
          throw new Error("Oops, something went wrong on posting")
        }
      })
      .then((data) => {
        notificationCtx.setIsShowing((prevStatus) => !prevStatus);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        type="text"
        id="addItem"
        placeholder="Add new item..."
        name="addItem"
        onChange={userInputHandler}
        ref={addItemRef}
      ></input>
      <AiFillPlusCircle
        onClick={addItemHandler}
        className={`${classes.icon} ${isIconActive && `${classes.iconActive}`}`}
      />
    </div>
  );
}

export default AddItem;

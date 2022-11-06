import { useState, useRef, useContext, useEffect } from "react";
import classes from "../styles/item.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCheckCircle, MdRemoveCircle } from "react-icons/md";
import NotificationContext from "../store/notification-context";

function Item(props) {
  const { title, id, isDone } = props;

  const notificationCtx = useContext(NotificationContext);

  //Trigger API delete method
  async function deleteItemHandler(event) {
    event.preventDefault();

    notificationCtx.setIsLoading(true);

    const data = { _id: id };

    await fetch("/api/chores", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
          
        }else{
            throw new Error("Oops, something went wrong on deleting");
        }
      })
      .then((data) => {
        notificationCtx.setIsShowing((prevStatus) => !prevStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  }



  const inputRef = useRef();

  //Trigger API update/patch method
  async function updateItemHandler(event) {
    event.preventDefault();

    const itemValue = inputRef.current.value;

    notificationCtx.setIsLoading(true);

    const data = {
      _id: id,
      title: itemValue,
      isDone: true,
    };

    await fetch("/api/chores", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }else{
          throw new Error("Oops, something went wrong on updating");
      }
      })
      .then((data) => {
        notificationCtx.setIsShowing((prevStatus) => !prevStatus);
      })

      .catch((error) => {
        console.log(error);
      });
  }



  const [isItemDone, setIsItemDone] = useState();

  //Change item style if it's done
  useEffect(() => {
    if (isDone) {
      setIsItemDone(true);
    } else {
      setIsItemDone(false);
    }
  });



  const [isFocused, setIsFocused] = useState(false);

  //Change the DOM if the item is focused
  const onBlurHandler = () => setIsFocused(false);
  const onFocusHandler = () => setIsFocused(true);

  return (
    <>
      {!isItemDone && (
        <div className={classes.container}>
          <input
            className={classes.input}
            type="text"
            defaultValue={title}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            ref={inputRef}
          ></input>
          {isFocused && (
            <div className={classes.iconWrapper}>
              <MdRemoveCircle
                onMouseDown={deleteItemHandler}
                className={`${classes.icon} ${classes.iconRed}`}
              />
              <MdCheckCircle
                onMouseDown={updateItemHandler}
                className={`${classes.icon} ${classes.iconGreen}`}
              />
            </div>
          )}
        </div>
      )}

      {isItemDone && (
        <div className={classes.containerDone}>
          <input
            className={classes.inputDone}
            type="text"
            readOnly={true}
            value={title}
          ></input>
        </div>
      )}
    </>
  );
}

export default Item;

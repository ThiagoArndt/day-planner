import { Fragment, useState, useRef, useEffect, useContext } from "react";
import classes from "../../styles/searchBar.module.css";
import { BiSearch } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import NotificationContext from "../../store/notification-context";

function SearchBar() {
  const notificationCtx = useContext(NotificationContext);

  const inputRef = useRef();

  //Clear search bar when clear filter function is called
  useEffect(() => {
    notificationCtx.setInputText((inputRef.current.value = ""));
  }, [notificationCtx.isFilterCleared]);



  //Sends new search bar input value to filter the list of items
  function onChangeHandler() {
    const lowerCase = inputRef.current.value.toLowerCase();
    notificationCtx.setInputText(lowerCase);
  }



  //Clear search bar input when the "X" icon is clicked
  function resetInputHandler() {
    notificationCtx.setInputText((inputRef.current.value = ""));
  }


  const [isFocused, setIsFocused] = useState(false);

  //Two functions to change the search bar state onFocus and onBlur
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return (
    <Fragment>
      <div className={classes.container}>
        {isFocused && <FiX onMouseDown={resetInputHandler} className={classes.icon} />}
        {!isFocused && <BiSearch className={classes.icon} />}
        <input
          className={classes.input}
          placeholder="Search items"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChangeHandler}
          ref={inputRef}
        />
      </div>
    </Fragment>
  );
}

export default SearchBar;

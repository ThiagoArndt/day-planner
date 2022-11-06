import { createContext, useState } from "react";

const NotificationContext = createContext({});

export function NotificationContextProvider(props) {
  const [isLoading, setIsLoading] = useState(true); //Data being fetched (useEffect re-renders the component);
  const [status, setStatus] = useState("null"); //Button status;
  const [inputText, setInputText] = useState(""); //Search bar input text;
  const [isShowing, setIsShowing] = useState(true); //API call finished response, (useEffect trigger API fetch function);
  const [completedValue, setCompletedValue] = useState(0); //Status bar percentage;
  const [isFilterCleared, setIsFilterCleared] = useState(false); //Filter clear function is triggered.

  const context = {
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    status: status,
    setStatus: setStatus,
    isShowing: isShowing,
    setIsShowing: setIsShowing,
    inputText: inputText,
    setInputText: setInputText,
    completedValue: completedValue,
    setCompletedValue: setCompletedValue,
    isFilterCleared: isFilterCleared,
    setIsFilterCleared: setIsFilterCleared,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;

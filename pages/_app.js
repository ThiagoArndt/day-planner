import Head from "next/head";
import { NotificationContextProvider } from "../store/notification-context";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Head>
        <title>SizeBay Challenge</title>
        <meta name="description" content="SizeBay Challenge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </NotificationContextProvider>
  );
}

export default MyApp;

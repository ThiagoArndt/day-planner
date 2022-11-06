import Head from "next/head";
import Layout from "../components/layout/layout";
import MainHeader from "../components/layout/main-header";
import StatusBar from "../components/status-bar";
import FilterSection from "../components/filter-section";
import AddItem from "../components/add-item";
import ItemList from "../components/item-list";
function HomePage() {
  return (
    <Layout>
      <Head>
        <title>SizeBay Challenge</title>
        <meta
          name="description"
          content="Organize your week with our to-do list."
        />
      </Head>
      <MainHeader />
      <StatusBar />
      <FilterSection />
      <AddItem />
      <ItemList />
    </Layout>
  );
}

export default HomePage;

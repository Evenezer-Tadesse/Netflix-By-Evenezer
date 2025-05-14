import React from "react";

import Header from "./../../Compontes/Header/Header";
import Footer from "./../../Compontes/Footer/Footer";
import Banner from "./../../Compontes/Banner/Banner";
import RowList from "../../Compontes/Rows/RowList/RowList";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <RowList/>
      <Footer />
    </>
  );
}

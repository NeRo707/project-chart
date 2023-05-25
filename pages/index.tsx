import React from "react";
import Navbar from "./components/Navbar";
import { DatePicker } from "antd";
import ChartBox from "./components/ChartBox";
import Fab from "./components/Fab";

const Home = () => {
  return (
    <>
      <Navbar />
      <ChartBox />
    </>
  );
};

export default Home;

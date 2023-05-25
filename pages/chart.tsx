import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Navbar from "./components/Navbar";
import axios from "axios";

export const options = {
  title: "Users",
};

interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

const Chartz = () => {
  const [data, setData] = useState<Array<Array<string | number>>>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setDataSource(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:3000/api/users");
      const users = response.data;

      // Count users by country
      const userCountByCountry = users.reduce((count:any, user:any) => {
        const country:any = user.address.city;
        count[country] = (count[country] || 0) + 1;
        return count;
      }, {});

      // Format the data for the chart
      const chartData: any = Object.entries(userCountByCountry).map(
        ([country, count]) => [country, count]
      );

      setData([["Country", "Count"], ...chartData]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </>
  );
};

export default Chartz;

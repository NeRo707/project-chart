import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import useUserStore from "@/store/useStore";
import { GetServerSideProps } from "next";
import axios from "axios";
import { IUser } from "@/store/types/IUser";

const Pie = dynamic(() => import("@ant-design/plots").then(({ Pie }) => Pie), {
  ssr: false,
});

const chart = ({ initialData }: { initialData: IUser[] }) => {
  const { Users, setUsers } = useUserStore();

  useEffect(() => {
    setUsers(initialData);
  }, [Users]);


  const cities = Users.map((user:any) => user.address.city);

  const cityData = cities.reduce((acc: any, city: any) => {
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(cityData).map(([city, count]) => ({
    city,
    count,
  }));

  const config = {
    appendPadding: 10,
    data,
    angleField: "count",
    colorField: "city",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };

  return (
    <>
      <Navbar />
      <Pie {...config} />;
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/users");

    return {
      props: {
        initialData: response.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        initialData: [],
      },
    };
  }
};

export default chart;

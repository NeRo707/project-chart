import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import ChartBox from "./components/ChartBox";
import Fab from "./components/Fab";
import { GetServerSideProps } from "next";
import { IUser } from "@/store/types/IUser";
import axios from "axios";
import useUserStore from "@/store/useStore";
const Home = ({ initialData }: { initialData: IUser[] }) => {

  const { Users ,setUsers } = useUserStore();

  useEffect(()=>{
    setUsers(initialData);
  },[Users]); 

  return (
    <>
      <Navbar />
      <ChartBox data={initialData} />
      <Fab />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users');

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

export default Home;

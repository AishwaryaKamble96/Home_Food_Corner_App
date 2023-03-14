import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";

//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api");
      const dataResponse = await data.json();
      console.log(dataResponse);
      setPostsList(dataResponse);
    };
    fetchData().catch(console.error);
  }, []);

  console.log(setPostsList);
  return <></>;
}

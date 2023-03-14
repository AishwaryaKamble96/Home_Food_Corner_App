import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TitleBar from "../component/TitleBar";
import Footer from "../component/Navigation";
import Post from "../component/Post";
import styled from "styled-components";
//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Wrapper imgUrl={process.env.PUBLIC_URL + "/background_img.jpg"}>
        Hi
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div``;

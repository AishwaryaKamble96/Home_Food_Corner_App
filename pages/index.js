import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TitleBar from "../component/TitleBar";
import Footer from "../component/Footer";
import Post from "../component/Post";
//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>
        <TitleBar />
        <Post />
        <Footer />
      </div>
    </>
  );
}

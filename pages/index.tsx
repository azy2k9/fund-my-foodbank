import type { NextPage } from "next";
import Head from "next/head";
import HomePage from './components/home'
import Navigationbar from './components/navigationbar';
import Footer from './components/footer';

const Home: NextPage = () => {
  return (
    <div>
        <Navigationbar></Navigationbar>
        <HomePage></HomePage>
        <Footer></Footer>
    </div>
  );
};

export default Home;

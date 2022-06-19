import type { NextPage } from "next";

import HomePage from './components/home'
import Footer from './components/footer';

const Home: NextPage = () => {
  return (
    <div>
        <HomePage></HomePage>
        <Footer></Footer>
    </div>
  );
};

export default Home;

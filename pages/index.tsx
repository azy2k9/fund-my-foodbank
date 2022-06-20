import type { NextPage } from 'next';

import HomePage from './components/home';
import Footer from './components/footer';
import Head from 'next/head';
const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <HomePage></HomePage>
            <Footer></Footer>
        </div>
    );
};

export default Home;

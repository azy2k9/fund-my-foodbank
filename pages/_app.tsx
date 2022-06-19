import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Fonts from './components/fonts';
import Theme from '../theme';
import Navigationbar from "./components/navigationbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={Theme}>
            <Fonts />
            <Navigationbar/>
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default MyApp;

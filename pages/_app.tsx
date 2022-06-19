import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Fonts from './components/fonts';
import Theme from '../theme';
import Navigationbar from "./components/navigationbar";
import { AppProvider } from "../lib/state"

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AppProvider>
            <ChakraProvider theme={Theme}>
                <Fonts />
                <Navigationbar></Navigationbar>
                    <Component {...pageProps} />
            </ChakraProvider>
        </AppProvider>
    );
};

export default MyApp;

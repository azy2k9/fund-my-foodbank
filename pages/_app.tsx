import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Fonts from './components/fonts';
import Theme from '../theme';
import Navigationbar from './components/navigationbar';
import { AppContextProvider } from './context/state';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AppContextProvider>
            <ChakraProvider theme={Theme}>
                <Fonts />
                <Navigationbar></Navigationbar>
                <Component {...pageProps} />
            </ChakraProvider>
        </AppContextProvider>
    );
};

export default MyApp;

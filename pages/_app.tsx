import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Fonts from './components/fonts';
import Theme from '../theme';
import {Container} from "@chakra-ui/layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={Theme}>
            <Fonts />
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default MyApp;

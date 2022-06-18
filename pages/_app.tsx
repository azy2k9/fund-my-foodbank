import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Fonts from './components/fonts';
import Theme from '../theme';
import NavBar from "./components/navbar";
import {Container} from "@chakra-ui/layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={Theme}>
            <Fonts />

            <NavBar/>
            <Container maxWidth={700}>
                <Component {...pageProps} />
            </Container>
        </ChakraProvider>
    );
};

export default MyApp;

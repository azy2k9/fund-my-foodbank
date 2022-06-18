import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "reset-css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;

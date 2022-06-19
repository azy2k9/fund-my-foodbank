import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            900: '#1a365d',
            800: '#153e75',
            700: '#2a69ac',
            600: '#5e9ed6',
            500: '#73bef3',
            400: '#91d9fd',
            300: '#b3ecff',
            200: '#d9faff',
            100: '#f2fcff',
        },
    },
    fonts: {
        heading: `'Inter', sans-serif`,
    },
});

export default theme;

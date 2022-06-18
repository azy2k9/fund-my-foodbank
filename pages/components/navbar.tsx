import { Box, Flex, Heading, Square } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <Flex mx={40} mt={4} alignItems={'center'}>
            <Square>
                <Link href={'/'}>
                    <Image src={'/food-bank-basket.svg'} width={100} height={100}></Image>
                </Link>
            </Square>
            <Heading flex={1} mx={2} textAlign={'center'} fontSize={60}>
                <Box color={'blackAlpha.800'} display={'inline'}>Fund your</Box> <Box color={'green.300'} display={'inline'}>Food bank</Box>
            </Heading>
            <Box>
                <Link href="#">
                    <a>
                        <Image src={'/Profile.svg'} width={30} height={30} aria-hidden/>
                        <Box>Food Bank </Box>
                        <Box>Sign in</Box>
                    </a>

                </Link>
            </Box>
        </Flex>
    );
};

export default Navbar;

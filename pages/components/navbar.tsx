import {Box, Flex, Heading, Square, Text} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <Flex  mx={40} mt={4} alignItems={'center'}>
                <Square _hover={{cursor: 'pointer'}}>
                    <Link href={'/'}>
                        <Image src={'/food-bank-basket.svg'} alt={'fund foodbank'} width={100} height={100}></Image>
                    </Link>
                </Square>
                <Heading flex={1} mx={2} textAlign={'center'} fontSize={60}>
                    <Box color={'blackAlpha.800'} display={'inline'}>Fund your</Box> <Box color={'green.300'} display={'inline'}>Food bank</Box>
                </Heading>
                <Box>
                    <Link href="#">
                        <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
                            <Image src={'/Profile.svg'} width={30} height={30} aria-hidden/>
                            <Text fontWeight={500}>Food Bank </Text>
                            <Text fontWeight={500}>Sign in</Text>
                        </Box>
                    </Link>
                </Box>
            </Flex>
        </nav>
    );
};

export default Navbar;

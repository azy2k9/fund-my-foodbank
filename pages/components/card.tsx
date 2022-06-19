import Image from 'next/image';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue, Button,
} from '@chakra-ui/react';

export default function Card(props) {
    return (
        <Center py={6}>
            <Box
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box
                    h={'210px'}
                    bg={'gray.100'}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}>
                    <Image
                        src={props.imagePath}
                        layout={'fill'}
                    />
                </Box>
                <Stack>
                    <Text color={'gray.500'}>
                        {props.text}
                    </Text>
                </Stack>
            </Box>
        </Center>
    );
}
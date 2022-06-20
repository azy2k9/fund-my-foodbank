import {
    Box,
    Button,
    chakra,
    Flex,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

interface ProductProps {
    name: string;
    value: number;
    description: string;
    onDonate: (plan: string, amount: number) => void;
}

export default function Product({ name, value, description, onDonate }: ProductProps) {
    const justify = useBreakpointValue(['space-evenly', , 'center']);

    return (
        <Flex
            flexDir={'column'}
            justifyContent={justify}
            _dark={{ bg: 'gray.800' }}
            px={4}
            h='400px'
            shadow='dark-lg'
            textAlign={'center'}
            rounded='md'
        >
            <chakra.p
                mb={1}
                fontSize='xs'
                fontWeight='bold'
                letterSpacing='wide'
                textTransform='uppercase'
                color='gray.500'
                _dark={{ color: 'gray.400' }}
            >
                {name}
            </chakra.p>
            <Text
                mb={2}
                fontSize='5xl'
                fontWeight={['bold', 'extrabold']}
                color='gray.900'
                _dark={{ color: 'gray.50' }}
                lineHeight='tight'
            >
                £{value}
                <chakra.span
                    fontSize='2xl'
                    fontWeight='medium'
                    color='gray.600'
                    _dark={{ color: 'gray.400' }}
                >
                    {' '}
                    per month
                </chakra.span>
            </Text>
            <chakra.p mb={6} fontSize='lg' color='gray.600' _dark={{ color: 'gray.500' }}>
                {description}
            </chakra.p>
            <Stack
                display={['block', , 'flex']}
                spacing={2}
                justifyContent='center'
                direction={['column', , 'row']}
            >
                <Button
                    w={['full', , 'auto']}
                    display='inline-flex'
                    alignItems='center'
                    justifyContent='center'
                    px={5}
                    py={3}
                    border='solid transparent'
                    fontWeight='bold'
                    shadow='md'
                    _light={{ color: 'white' }}
                    bg='green.400'
                    _dark={{ bg: 'green.500' }}
                    _hover={{
                        bg: 'green.600',
                        _dark: { bg: 'green.600' },
                    }}
                    onClick={() => onDonate(name, value)}
                >
                    Donate
                </Button>
            </Stack>
        </Flex>
    );
}

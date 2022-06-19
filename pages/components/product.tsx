import { Box, Button, chakra, Flex, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';

interface ProductProps {
    name: string;
    value: number;
    description: string;
    onDonate: (plan: string) => void;
}

export default function Product({ name, value, description, onDonate }: ProductProps) {
    return (
        <Box bg='white' _dark={{ bg: 'gray.800' }} px={4} py={24} shadow='base' rounded='md'>
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
                    rounded='md'
                    shadow='md'
                    _light={{ color: 'white' }}
                    bg='brand.600'
                    _dark={{ bg: 'brand.500' }}
                    _hover={{
                        bg: 'brand.700',
                        _dark: { bg: 'brand.600' },
                    }}
                    onClick={() => onDonate(name)}
                >
                    Donate
                </Button>
            </Stack>
        </Box>
    );
}

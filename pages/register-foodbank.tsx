import React from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const RegisterFoodbank = () => {
    const router = useRouter();
    return (
        <Flex
            flexDir='column'
            py={10}
            px={6}
            h='90vh'
            justifyContent={'center'}
            alignItems='center'
        >
            <Heading as='h1' size='4xl' color={'green.400'}>
                Coming soon...
            </Heading>
            <Text fontSize='18px' mt={3} mb={2}>
                We're not ready yet!
            </Text>
            <Text color={'gray.500'} mb={6}>
                The page you're looking is in active development, check back soon to see it live.
            </Text>
            <Button
                colorScheme={'green'}
                bg={'green.400'}
                _hover={{
                    bg: 'green.500',
                }}
                color='white'
                variant='solid'
                onClick={() => router.push('/')}
            >
                Go to Home
            </Button>
        </Flex>
    );
};

export default RegisterFoodbank;

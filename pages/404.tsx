import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function NotFound() {
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
                404
            </Heading>
            <Text fontSize='18px' mt={3} mb={2}>
                Page Not Found
            </Text>
            <Text color={'gray.500'} mb={6}>
                The page you're looking for does not seem to exist
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
}

import { NextPage } from 'next';
import { Button, Checkbox, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import Link from 'next/link';
import { Box, Container, Flex, Spacer } from '@chakra-ui/layout';
import { useRouter } from 'next/router';

const Donation: NextPage = () => {
    const router = useRouter();

    return (
        <Container maxWidth={750}>
            <FormControl
                as={'fieldset'}
                display={'flex'}
                flexDir={'column'}
                justifyItems={'between'}
                isRequired={false}
                mt={8}
            >
                <FormLabel as={'legend'} fontSize={30}>
                    Enter your details here
                </FormLabel>
                <FormLabel>Name</FormLabel>
                <Input my={5} required placeholder={'Name'}></Input>
                <FormLabel>Email</FormLabel>
                <Input my={5} required placeholder={'Email Address'}></Input>
                <Checkbox required _highlighted={{ color: 'green' }}>
                    Opt in to recieve email updates from your local food banks on how your donation
                    has helped them
                </Checkbox>
                <Flex my={5} gap={5}>
                    <Button colorScheme={'red'}>
                        <Link href={'/'}>Go back</Link>
                    </Button>
                    <Spacer />
                    <Box>
                        <Button
                            type={'submit'}
                            colorScheme={'green'}
                            onClick={() => router.push('/donation-amount')}
                        >
                            Next
                        </Button>
                    </Box>
                </Flex>
            </FormControl>
        </Container>
    );
};

export default Donation;

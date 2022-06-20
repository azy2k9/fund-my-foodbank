import { NextPage } from 'next';
import { Button, Checkbox, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import Link from 'next/link';
import { Box, Container, Flex, Spacer } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import useAppState from '../hooks/useAppState';
import { useState } from 'react';
import Head from 'next/head';

const Donation: NextPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [optIn, setOptIn] = useState(false);

    const router = useRouter();
    const { setAppState } = useAppState();

    const handleClick = () => {
        setAppState({
            donator_name: name,
            donator_email: email,
        });
        router.push('/donation-amount');
    };

    return (
        <>
            <Head>
                <title>Enter Details</title>
            </Head>
            <Container maxWidth={700}>
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
                    <Input
                        my={5}
                        required
                        placeholder={'Name'}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <FormLabel>Email</FormLabel>
                    <Input
                        my={5}
                        required
                        placeholder={'Email Address'}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Checkbox
                        checked={optIn}
                        onChange={() => setOptIn((isChecked) => !isChecked)}
                        _highlighted={{ color: 'green' }}
                    >
                        Opt in to recieve email updates from your local food banks on how your
                        donation has helped them
                    </Checkbox>
                    <Flex my={5} gap={5}>
                        <Button colorScheme={'red'}>
                            <Link href={'/'}>Go back</Link>
                        </Button>
                        <Spacer />
                        <Box>
                            <Button
                                disabled={optIn === false}
                                type={'submit'}
                                colorScheme={'green'}
                                onClick={handleClick}
                            >
                                Next
                            </Button>
                        </Box>
                    </Flex>
                </FormControl>
            </Container>
        </>
    );
};

export default Donation;

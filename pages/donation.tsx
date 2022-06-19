import { NextPage } from 'next';
import { Button, Checkbox, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import Link from 'next/link';
import { Box, Container, Flex, Spacer } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Donation: NextPage = () => {
    const router = useRouter();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('test')
    const [submitted, setSubmitted] = useState(false)

    const handleDonationSubmition = (e) => {
        handleSubmit(e)
        router.push('/donation-amount')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Sending')
        let data = {
            name,
            email,
            message
        }
        fetch('/api/sendDonationEmailToCharity', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
                console.log('Response succeeded!')
                setSubmitted(true)
                setName('')
                setEmail('')
            }
        })
    }


    return (
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
                <Input my={5} required placeholder={'Name'} onChange={(e) => {setName(e.target.value)}}></Input>
                <FormLabel>Email</FormLabel>
                <Input my={5} required placeholder={'Email Address'} onChange={(e) => {setEmail(e.target.value)}}></Input>
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
                            onClick={(e) => handleDonationSubmition(e)}
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

import { Form } from '@chakra-ui/theme/components';
import { Button, Container, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const FeedBackForm = () => {
    const [foodbank_names] = useState([
        'Broughton Hub',
        'No. 93 (formerly the Harpurhey Wellbeing Centre)',
        'St Philips, Chapel Street',
    ]);
    const [donator_name] = useState('Arslaan Qadus');
    const [money_raised, setMoneyRaised] = useState(0);
    const [people_helped, setPeopleHelped] = useState(0);
    const [food_packs_donated, setFoodPacksDonated] = useState(0);
    const [donator_email] = useState('azy2k9@gmail.com');

    const toast = useToast();
    const router = useRouter();

    const handleClick = async () => {
        const res = await fetch('/api/notify-donator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foodbank_names,
                donator_name,
                people_helped,
                money_raised,
                food_packs_donated,
                donator_email,
            }),
        }).then((res) => res.json());

        router.push('/');
        toast({
            title: 'Success',
            description: 'Your feedback has been sent to the donators!',
            status: 'success',
            isClosable: true,
            duration: 5000,
            position: 'bottom-right',
        });
        console.log(res);
    };

    return (
        <>
            <Head>
                <title>Enter Feedback</title>
            </Head>
            <Container maxWidth={700}>
                <FormControl as={'fieldset'} my={10}>
                    <FormLabel as={'legend'} bg={'green.300'} textAlign={'center'}>
                        Hello! It’s time to update your community on how their donations have helped
                        the food bank. Enter the information below and we’ll send out the email for
                        you!
                    </FormLabel>
                    <FormLabel mt={20}>
                        Roughly how many people have been helped in the last month?
                    </FormLabel>
                    <Input
                        my={6}
                        required
                        placeholder={'0'}
                        min={0}
                        defaultValue={0}
                        value={people_helped}
                        onChange={(e) => {
                            if (e.target.value !== '') {
                                setPeopleHelped(parseInt(e.target.value));
                            }
                        }}
                    />
                    <FormLabel>
                        Roughly how many family food bank packages have been prepared in the last
                        month?
                    </FormLabel>
                    <Input
                        my={6}
                        required
                        placeholder={'0'}
                        min={0}
                        defaultValue={0}
                        value={food_packs_donated}
                        onChange={(e) => {
                            if (e.target.value !== '') {
                                setFoodPacksDonated(parseInt(e.target.value));
                            }
                        }}
                    />
                    <FormLabel>
                        Roughly how much money has been donated to your food bank in the last month?{' '}
                    </FormLabel>
                    <Input
                        my={6}
                        required
                        placeholder={'0'}
                        min={0}
                        defaultValue={0}
                        value={money_raised}
                        onChange={(e) => {
                            if (e.target.value !== '') {
                                setMoneyRaised(parseFloat(e.target.value));
                            }
                        }}
                    />
                    <Flex justifyContent={'end'}>
                        <Button
                            bg={'green.600'}
                            color={'#ffff'}
                            _hover={{ background: 'green.700' }}
                            onClick={handleClick}
                        >
                            Send email to Donators
                        </Button>
                    </Flex>
                </FormControl>
            </Container>
        </>
    );
};

export default FeedBackForm;

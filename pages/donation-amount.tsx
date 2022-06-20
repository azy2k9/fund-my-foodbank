import { Container, Flex, SimpleGrid, VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import useAppState from '../hooks/useAppState';
import Product from './components/product';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const DonationAmount = () => {
    const toast = useToast({ isClosable: true, status: 'error', position: 'bottom-right' });
    const { appState, setAppState } = useAppState();

    const handleDonate = async (plan: string, amount: number) => {
        const { sessionId } = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // TODO: Retrieve the email / user and send them to the api
            // TODO: Retrieve the selected foodbanks and send them to the api
            body: JSON.stringify({
                plan,
                amount,
                donator_email: appState.donator_email,
                donator_name: appState.donator_name,
                foodbank_names: appState.foodbanks,
            }),
        }).then((res) => res.json());

        // if (!sessionId) {
        //     toast({
        //         title: 'Error',
        //         description: 'Couldnt find your checkout session',
        //     });
        // } else {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });

        if (error) {
            toast({
                title: 'Error',
                description: error.message,
            });
        }
    };

    return (
        <Container h='90vh' maxWidth={['xl', , '6xl']} display='flex'>
            <SimpleGrid
                alignContent={'center'}
                columns={[1, , 3]}
                gap='24px'
                mx='auto'
                textAlign={['left', , 'center']}
            >
                <Product
                    name='small'
                    description='A small donation of only £5 per month will help us to keep 1 person fed for 2 whole days'
                    value={5}
                    onDonate={(plan: string, amount: number) => handleDonate(plan, amount)}
                />
                <Product
                    name='medium'
                    description='A medium donation of only £10 per month will help us to keep 1 person fed for a full week'
                    value={10}
                    onDonate={(plan: string, amount: number) => handleDonate(plan, amount)}
                />

                <Product
                    name='large'
                    description='A small donation of only £20 per month will help us to keep 1 person fed for 2 weeks'
                    value={20}
                    onDonate={(plan: string, amount: number) => handleDonate(plan, amount)}
                />
            </SimpleGrid>
        </Container>
    );
};

export default DonationAmount;

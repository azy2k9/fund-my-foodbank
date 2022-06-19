import { NextPage } from 'next';
import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import Link from 'next/link';
import useAppState from '../hooks/useAppState';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DonationSuccessfull: NextPage = () => {
    const router = useRouter();
    const params = router.query;

    useEffect(() => {
        if (router.query) {
            if (
                Object.prototype.hasOwnProperty.call(router.query, 'amount') &&
                Object.prototype.hasOwnProperty.call(router.query, 'donator_name') &&
                Object.prototype.hasOwnProperty.call(router.query, 'donator_email') &&
                Object.prototype.hasOwnProperty.call(router.query, 'foodbank_names')
            ) {
                const fetchData = async () => {
                    const res = await fetch('/api/notify-foodbank', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            amount: router.query.amount,
                            donator_email: router.query.donator_email,
                            donator_name: router.query.donator_name,
                            foodbank_names: JSON.parse(router.query.foodbank_names as string),
                        }),
                    }).then((res) => res.json());
                };

                fetchData();
            }
        }
    }, [params]);

    return (
        <>
            <Container maxWidth={550}>
                <Flex mt={10} gap={30} alignItems={'center'} mx={4}>
                    <Box mt={3}>
                        <Image src={'/tick-square.svg'} width={30} height={30} />
                    </Box>
                    <Text fontSize={30} fontWeight={500} textAlign={'center'}>
                        You’ve made a difference!
                    </Text>
                </Flex>
            </Container>
            <Box bg={'green.400'} p={10} mx={80} rounded={20} mt={10}>
                <Text textAlign={'center'} fontSize={40} fontWeight={700}>
                    Thank you for supporting your local community
                </Text>
            </Box>
            <Box mx={80} mt={8}>
                <Text textAlign={'center'}>Tell your friends about Fund My Food Bank</Text>
            </Box>
            <Flex justifyContent={'center'} gap={30} mt={8}>
                <Image src={'/twitter.svg'} width={30} height={30} />
                <Link onClick={() => console.log('share to twitter')} href={'#'}>
                    <Text textDecoration={'underline'}>Share tweet</Text>
                </Link>
            </Flex>
        </>
    );
};

export default DonationSuccessfull;

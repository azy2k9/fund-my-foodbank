import { Form} from '@chakra-ui/theme/components';
import { Button, Container, FormControl, FormLabel, Input, SimpleGrid, Box , Text, Center, Heading} from '@chakra-ui/react';
import { CheckIcon, Icon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import Feature from './components/featuredisplay';
import { useState } from 'react';

const RegisterFoodBank = () => {
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

        console.log(res);
    };

    return (
        <Center>
            <Box width='90vw' mt='6'>
                    <Box m='3'>
                        <Text fontSize='3xl'>Welcome to Fund My Food Bank!</Text>
                    </Box>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
                        <Feature
                            icon={<Icon as={CheckIcon} w={5} h={5} />}
                            title={'Sign up with us'}
                        />
                        <Feature
                            icon={<Icon as={CheckIcon} w={5} h={5} />}
                            title={'Receive donations from your community'}
                        />
                        <Feature
                            icon={<Icon as={CheckIcon} w={5} h={5} />}
                            title={'Feed back on how the donations have helped'}
                        />
                        <Feature
                            icon={<Icon as={CheckIcon} w={5} h={5} />}
                            title={'We’ll let your donators know so they donate again'}
                        />
            </SimpleGrid>
            <Box width='90vw' mt='6'>
            <FormControl  as={'fieldset'} my={10}>
            <SimpleGrid columns={2} spacing={100}>
            <Box >
                <Heading as='h4' size='md'>
                    Enter your details here
                </Heading>
                <FormLabel htmlFor='foodbank-name' mt={10}>
                Food Bank name
                </FormLabel>
                <Input
                    required
                    id='foodbank-name'
                    placeholder='Food Bank name'
                />
            
                <FormLabel htmlFor='address' mt={5}>
                Address
                </FormLabel>
                <Input
                    id="address"
                    required
                    placeholder='Address'
                
                />
                <FormLabel htmlFor='postcode' mt={5}>
                Post code
                </FormLabel>
                <Input
                    width={200}
                   id="postcode"
                   required
                   placeholder='Postcode'
                />
                 <FormLabel  mt={5}  htmlFor='email'>
                    Email address
                </FormLabel>
                <Input id='email' type='email' />


            </Box>
                <Box>
                <FormLabel  mt={5}  htmlFor='create-password'>
                    Create Password
                </FormLabel>
                <Input id='create-password' type='email' />
                <FormLabel  mt={5}  htmlFor='confirm-password'>
                    Confirm password
                </FormLabel>
                <Input id='confirm-password' type='email' />
                </Box>
                </SimpleGrid>
                <Flex justifyContent={'end'}  mt={5}>
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
            </Box>
        </Box>
        </Center>
    );
};

export default RegisterFoodBank;

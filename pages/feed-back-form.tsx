import {Form} from "@chakra-ui/theme/components";
import {Button, Container, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {Flex} from "@chakra-ui/layout";


const FeedBackForm = () => {
    return (
        <Container maxWidth={700}>
            <FormControl as={'fieldset'} my={10}>
                <FormLabel as={'legend'} bg={'green.300'} textAlign={'center'}>Hello! It’s time to update your community on how their donations have helped the food bank. Enter the information below and we’ll send out the email for you!</FormLabel>
                <FormLabel mt={20}>Roughly how many people have been helped for the last three months?</FormLabel>
                <Input placeholder={'0'} my={6} type={'number'} min={0}/>
                <FormLabel>Roughly how many family food bank packages have been prepared for the last three months?</FormLabel>
                <Input placeholder={'0'} my={6} type={'number'} min={0}/>
                <FormLabel>Roughly how much money has been donated to your food bank for the last three months? </FormLabel>
                <Input placeholder={'0'} my={6} type={'number'} min={0}/>
                <Flex justifyContent={'end'}>
                    <Button bg={'green.600'} color={'#ffff'} _hover={{background: 'green.700'}}>Send email to Donators</Button>
                </Flex>
            </FormControl>
        </Container>
    )
}

export default FeedBackForm;
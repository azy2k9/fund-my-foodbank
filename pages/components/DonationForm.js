import {Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import Link from "next/link";
import {Box, Flex, Spacer} from "@chakra-ui/layout";
import {useRef, useState} from "react";

export default () => {
    const [required, updateRequired] = useState();
    const [data, changeData] = useState({
        name: '',
        email: '',
    });

    const control = useRef(null);
    const submit = () => {
        console.log(control)
        //TODO: updateRequired((currentRequired) => )
    };


    return (
        <FormControl as={'fieldset'}
                     flex
                     flexDir={'column'}
                     alignItems={'center'}
                     justifyItems={'between'}
                     isRequired={required}
                     ref={control}
        >
            <FormLabel as={'legend'} fontSize={50}>Enter your details here</FormLabel>
            <FormLabel>Name</FormLabel>
            <Input my={5} required ></Input>
            <FormLabel>Email</FormLabel>
            <Input my={5} required ></Input>
            <Flex my={5}>
                <Box background={'white'} border={'solid 1px'} px={3}>
                    <Link href={{
                        pathname: '/'
                    }}>
                        <a>Go back</a>
                    </Link>
                </Box>
                <Spacer/>
                <Box>
                    <Button type={'submit'} colorScheme={'green'} onClick={submit}>Proceed</Button>
                </Box>
            </Flex>
        </FormControl>
    )
}
import {Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import Link from "next/link";
import {Box, Flex, Spacer} from "@chakra-ui/layout";

export default () => {
    //TODO const [required, updateRequired] = useState();
    //TODO const [data, changeData] = useState();

   //TODO const control = useRef(null);
    const submit = () => {
        //TODO: updateRequired((currentRequired) => )
    };


    return (
        <FormControl as={'fieldset'}
                     display={'flex'}
                     flexDir={'column'}
                     
                     justifyItems={'between'}
                     isRequired={false}
                     mt={8}
        >
            <FormLabel as={'legend'} fontSize={30}>Enter your details here</FormLabel>
            <FormLabel>Name</FormLabel>
            <Input my={5} required placeholder={'name'}></Input>
            <FormLabel>Email</FormLabel>
            <Input my={5} required placeholder={'email@'}></Input>
            <Flex my={5} gap={5}>
                <Box background={'white'} border={'solid 1px'} px={3}>
                    <Link href={{
                        pathname: '/'
                    }}>
                        <a>Go back</a>
                    </Link>
                </Box>
                <Spacer/>
                <Box>
                    <Button type={'submit'}
                            colorScheme={'green'}
                            onClick={submit}>
                        Proceed to payment details
                    </Button>
                </Box>
            </Flex>
        </FormControl>
    )
}
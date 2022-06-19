import {NextPage} from "next";
import {Box, Container, Flex, Text} from "@chakra-ui/layout";
import {Image} from "@chakra-ui/image";
import Link from "next/link";
import { useContextState } from '../lib/state';
import { useEffect } from 'react';


const DonationSuccessfull: NextPage = () => {
    const { state, setContextState } = useContextState()
    const click = () => {
        setContextState({
            something:false
        })
        console.log(state)

    }
    const displayState = () => {
        console.log(state)
    }

    return (
        <>
        <Container maxWidth={550}>
            <Flex mt={10} gap={30} alignItems={'center'} mx={4}>
                <Box mt={3}>
                    <Image src={'/tick-square.svg'} width={30} height={30}/>
                </Box>
                <Text fontSize={30}
                      fontWeight={500}
                      textAlign={'center'}>
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
                <Text textAlign={'center'}>
                    Tell your friends about Fund My Food Bank
                </Text>
            </Box>
            <Flex justifyContent={'center'} gap={30} mt={8}>
                <Image src={'/twitter.svg'} width={30} height={30}/>
                <Link onClick={()=>click()} href={'#'}><Text textDecoration={'underline'}>Share tweet</Text></Link>
                <Link onClick={()=>displayState()} href={'#'}><Text textDecoration={'underline'}>displayst</Text></Link>

                <a onClick={()=>click()} href={'#'}><Text textDecoration={'underline'}>View inital state</Text></a>
                <a onClick={()=>displayState()} href={'#'}><Text textDecoration={'underline'}>update state</Text></a>
            </Flex>
            </>
    )
}

export  default  DonationSuccessfull;
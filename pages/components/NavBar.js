import {Box, Flex, Heading, Spacer, Square} from "@chakra-ui/layout";
import {Image} from "@chakra-ui/image";
import {Button} from "@chakra-ui/react";
import Link from "next/link";
import {Component} from "react";


export default () => {
    return (
        <Flex mx={40} mt={4} alignItems={'center'}>
            <Square>
                <Link href={'/'}>
                    <Image src={'/food-bank-basket.svg'} width={100} height={100}></Image>
                </Link>
            </Square>
                <Heading flex={1} mx={2} textAlign={'center'} fontFamily={'Inter'}>Fund my Fodbank</Heading>
            <Box >
                <Link href="#">
                    Food Bank sign in
                </Link>
            </Box>
        </Flex>
    )
}
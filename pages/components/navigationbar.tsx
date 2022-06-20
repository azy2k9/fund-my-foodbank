import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    useDisclosure,
    Divider,
    Heading,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { useRouter } from 'next/router';

const Links = [
    {
        name: 'Home',
        route: '/',
    },
    {
        name: 'Donate',
        route: '/find-local-foodbank',
    },
    {
        name: 'Register Foodbank',
        route: '/register-foodbank',
    },
];

export default function Navigationbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    return (
        <>
            <Box px={4} h='7vh'>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <HStack onClick={() => router.push('/')} _hover={{ cursor: 'pointer' }}>
                            <Image src={'/fund-your-foodbank-logo.svg'} width={82} height={82} />
                            <Heading size={'md'}>Fund My</Heading>
                            <Heading size={'md'} color='green.500'>
                                Food Bank
                            </Heading>
                        </HStack>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <Button
                                    px={2}
                                    py={1}
                                    key={link.route}
                                    variant={'ghost'}
                                    _hover={{
                                        textDecoration: 'none',
                                    }}
                                    onClick={() => {
                                        router.push('/' + link.route);
                                    }}
                                >
                                    {link.name}
                                </Button>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            bg={'green.400'}
                            _hover={{ background: 'green.500' }}
                            color='white'
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}
                            onClick={() => router.push('/feed-back-form')}
                        >
                            Leave Feedback
                        </Button>
                    </Flex>
                </Flex>
                <Divider></Divider>
            </Box>
        </>
    );
}

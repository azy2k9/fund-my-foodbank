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
        name: 'Find Local Foodbank',
        route: '/find-local-foodbank',
    },
];

export default function Navigationbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    return (
        <>
            <Box px={4} h='10vh'>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Image
                                src={'/fund-your-foodbank-logo.svg'}
                                width={82}
                                height={82}
                                onClick={() => router.push('/')}
                                _hover={{ cursor: 'pointer' }}
                            />
                        </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <Button
                                    key={link.route}
                                    px={2}
                                    variant={'ghost'}
                                    py={1}
                                    rounded={'md'}
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
                            style={{ backgroundColor: '#48bb78' }}
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

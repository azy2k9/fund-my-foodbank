import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure, Divider
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';


const Links = ['Home', 'Donate', 'Register a Food bank'];

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
        }}
        href={'#'}>
      {children}
    </Link>
);

export default function Navigationbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <>
        <Box px={4}>
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
                <Image src={'/fund-your-foodbank-logo.svg'} width={82} height={82} ></Image>
              </Box>
              <HStack
                  as={'nav'}
                  spacing={4}
                  display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Button
                  variant={'solid'}
                  style={{backgroundColor:"#48bb78"}}
                  size={'sm'}
                  mr={4}
                  leftIcon={<AddIcon />}>
                Food Bank Sign in
              </Button>
            </Flex>
          </Flex>
          <Divider></Divider>
        </Box>

      </>
  );
}
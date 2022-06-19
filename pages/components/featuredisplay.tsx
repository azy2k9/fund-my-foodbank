import { ReactElement } from 'react';
import { Text, Stack, Flex, Box } from '@chakra-ui/react';

interface FeatureProps {
    title: string;
    icon: ReactElement;
}

export const Feature = ({ title, icon }: FeatureProps) => {
    return (
        <Box backgroundColor={'#48BB78'} borderRadius={'3px'}>
            <Flex alignItems='center' height={'100%'} backgroundColor={'#C6F6D5'} ml={'2'}>
                <Flex
                    w={8}
                    h={8}
                    align={'center'}
                    justify={'center'}
                    rounded={'full'}
                    bg={'#48BB78'}
                    m={2}
                >
                    {icon}
                </Flex>
                <Text fontWeight={600} width={'200px'}>
                    {title}
                </Text>
            </Flex>
        </Box>
    );
};

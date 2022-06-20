import { ReactElement } from 'react';
import { Text, Stack, Flex, Box, useBreakpointValue } from '@chakra-ui/react';

interface FeatureProps {
    title: string;
    icon: ReactElement;
}

const Feature = ({ title, icon }: FeatureProps) => {
    const flex = useBreakpointValue({ base: '', md: '1' });

    return (
        <Box backgroundColor={'#48BB78'} borderRadius={'3px'} m='1'>
            <Flex alignItems='center' height={'100%'} backgroundColor={'#C6F6D5'} ml={'1'} py='2'>
                <Flex
                    maxW={30}
                    h={8}
                    align={'center'}
                    justify={'center'}
                    rounded={'full'}
                    bg={'#48BB78'}
                    m={2}
                    flex={flex}
                >
                    {icon}
                </Flex>
                <Text fontWeight={600}>{title}</Text>
            </Flex>
        </Box>
    );
};
export default Feature;

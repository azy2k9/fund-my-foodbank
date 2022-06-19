import { SimpleGrid } from '@chakra-ui/layout';
import React from 'react';
import Product from './components/product';

const DonationAmount = () => {
    const handleDonate = (plan: string) => {
        console.log(plan);
    };

    return (
        <SimpleGrid columns={[1, , 3]} gap='24px' mx='auto' textAlign={['left', , 'center']}>
            <Product
                name='small'
                description='A small donation of only £5 per month will help us to keep 1 person fed for 2 whole days'
                value={5}
                onDonate={(plan: string) => handleDonate(plan)}
            />
            <Product
                name='medium'
                description='A medium donation of only £10 per month will help us to keep 1 person fed for a full week'
                value={5}
                onDonate={(plan: string) => handleDonate(plan)}
            />
            <Product
                name='large'
                description='A small donation of only £20 per month will help us to keep 1 person fed for 2 weeks'
                value={5}
                onDonate={(plan: string) => handleDonate(plan)}
            />
        </SimpleGrid>
    );
};

export default DonationAmount;

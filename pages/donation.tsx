import DonationForm from './components/donationform';
import {NextPage} from "next";
import {Container} from "@chakra-ui/react";

const Donation: NextPage = () => {
    return (
        <Container maxWidth={700}>
            <DonationForm></DonationForm>
        </Container>
    )
};

export default Donation;

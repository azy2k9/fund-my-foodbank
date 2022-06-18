import {NextPage} from "next";
import NavBar from "./components/NavBar.js";
import DonationForm from './components/DonationForm';
import {Container} from "@chakra-ui/layout";
const Donation: NextPage = () => {
    return (
        <>
            <NavBar/>
            <Container maxWidth={700}>
                <DonationForm></DonationForm>
            </Container>
        </>
    )
};

export default Donation;
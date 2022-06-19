import DonationForm from './components/donationform';
import { NextPage } from 'next';
import Navigationbar from "./components/navigationbar";

const Donation: NextPage = () => {
    return (
        <>
            <Navigationbar/>
            <DonationForm></DonationForm>
        </>
    )
};

export default Donation;

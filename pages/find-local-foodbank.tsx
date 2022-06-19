import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';
import {
    Box,
    Button,
    Text,
    Input,
    Flex,
    Center,
    Checkbox,
    SimpleGrid,
    Icon,
    Stack,
} from '@chakra-ui/react';
import { returnClosestFoodbanks } from '../utils/foodbankSorter';
import { Feature } from './components/featuredisplay';
import { CheckIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const FindLocalFoodbank = () => {
    const router = useRouter();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
        libraries: ['places'],
    });
    // map gets rendred with location
    const [location, setLocation] = useState(null); // setting a val causes error
    // address is the object from google autocomplete
    const [address, setAddress] = useState(null);
    // array that conatins the closest foodbanks
    const [foodbanks, setFoodbanks] = useState(null);
    const [displayCheckboxes, setDisplayCheckboxes] = useState(false);
    // checkbox value
    const [allCheckbox, setAllCheckbox] = useState(null);

    useEffect(() => {
        if (location !== null) {
            const myFoodbanks = returnClosestFoodbanks(location.lat, location.lng);
            setFoodbanks(myFoodbanks);
            setDisplayCheckboxes(true);
            // loop through and set default false for all checkboxes
            let checkArr = [];
            myFoodbanks.forEach((foodbank, i) => {
                const foodbankCheck = {
                    name: foodbank.foodbank_name,
                    checkboxIndex: i,
                    checkboxDefault: false,
                };
                checkArr.push(foodbankCheck);
            });
            setAllCheckbox(checkArr);
        }
    }, [location]);

    const getPosition = () => {
        const success = (position) => {
            if (
                location?.lat !== position.coords.latitude ||
                location?.lng !== position.coords.longitude
            ) {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }
        };

        const error = (err) => {
            console.log('error getting position: ', err);
        };
        navigator.geolocation.getCurrentPosition(success, error);
    };

    const markerClick = (index) => {
        const currentVal = allCheckbox[index].checkboxDefault;
        const changedObject = {
            ...allCheckbox[index],
            checkboxDefault: !currentVal,
        };
        let filteredArray = [...allCheckbox];
        filteredArray.splice(index, 1, changedObject);
        setAllCheckbox(filteredArray);
    };
    const foodbankMarkers =
        foodbanks === null
            ? ''
            : foodbanks.map((foodbank, i) => (
                  <Marker
                      onClick={() => {
                          markerClick(i);
                      }}
                      key={i}
                      icon={{
                          url: 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png',
                      }}
                      position={{
                          lat: parseFloat(foodbank.centre_geolocation.lat),
                          lng: parseFloat(foodbank.centre_geolocation.lng),
                      }}
                  />
              ));
    const submitFoodbankChoices = () => {
        const myChoosenFoodbanks = [...allCheckbox].filter((obj) => obj.checkboxDefault === true);
        router.push('/donation');
    };

    const center = location ? location : { lat: 51.507, lng: -0.127 }; //useMemo(() => ({ lat: 44, lng: -80 }), []);
    if (!isLoaded && location === null) return <div>...loading</div>;
    return (
        <Center>
            <Stack>
                <Box width='90vw' mt='6'>
                    <Box m='3'>
                        <Text fontSize='3xl'>Donating to your local food banks</Text>
                    </Box>
                    <Box>
                        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
                            <Feature
                                icon={<Icon as={CheckIcon} w={5} h={5} />}
                                title={'Find your local food banks'}
                            />
                            <Feature
                                icon={<Icon as={CheckIcon} w={5} h={5} />}
                                title={'Split your donantion equally'}
                            />
                            <Feature
                                icon={<Icon as={CheckIcon} w={5} h={5} />}
                                title={'Receive updates about how your donations helped'}
                            />
                            <Feature
                                icon={<Icon as={CheckIcon} w={5} h={5} />}
                                title={'Support your community'}
                            />
                        </SimpleGrid>
                    </Box>
                    <Flex width='auto' m='4'>
                        <Box m='2'>
                            <GoogleMap
                                zoom={12}
                                options={{
                                    streetViewControl: false,
                                    mapTypeControl: false,
                                }}
                                center={center}
                                mapContainerStyle={{ width: '500px', height: '400px' }}
                            >
                                <Marker position={center} />
                                {foodbankMarkers}
                            </GoogleMap>
                        </Box>
                        <Stack m='2'>
                            <Text m='2' fontSize='2xl' fontWeight={'600'}>
                                Search your local foodbanks
                            </Text>
                            <Flex alignItems={'center'}>
                                <Autocomplete
                                    onLoad={(data) => {
                                        setAddress(data);
                                    }}
                                    onPlaceChanged={() => {
                                        const lat = address.getPlace().geometry.location.lat();
                                        const lng = address.getPlace().geometry.location.lng();
                                        setLocation({ lat: lat, lng: lng });
                                    }}
                                >
                                    <Input
                                        width={'400px'}
                                        m='2'
                                        placeholder='Enter your address or postcode...'
                                    />
                                </Autocomplete>

                                <Button
                                    colorScheme='blackAlpha'
                                    m='3'
                                    onClick={() => {
                                        getPosition();
                                    }}
                                >
                                    Use location
                                </Button>
                            </Flex>
                            <Box>
                                {displayCheckboxes ? (
                                    <Box m='3'>
                                        <Stack>
                                            {foodbanks.map((foodbank, j) => (
                                                <Checkbox
                                                    colorScheme='#718096'
                                                    iconColor='#171923'
                                                    border={'solid black 1px'}
                                                    borderRadius={'5px'}
                                                    pl={'3'}
                                                    width={'100%'}
                                                    key={j}
                                                    isChecked={allCheckbox[j].checkboxDefault}
                                                    onChange={() => {
                                                        markerClick(j);
                                                    }}
                                                >
                                                    {foodbank.foodbank_name}
                                                </Checkbox>
                                            ))}
                                        </Stack>
                                    </Box>
                                ) : (
                                    ''
                                )}
                            </Box>
                        </Stack>
                    </Flex>
                </Box>
                {displayCheckboxes ? (
                    <Box display={'flex'} alignItems='center' justifyContent={'right'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mr='4'>
                            Want to split your donation to these local food banks?
                        </Text>
                        <Button
                            colorScheme='green'
                            m='2'
                            onClick={() => {
                                submitFoodbankChoices();
                            }}
                            pr={'8'}
                            pl={'8'}
                        >
                            Yes I want to donate
                        </Button>
                    </Box>
                ) : (
                    ''
                )}
            </Stack>
        </Center>
    );
};
export default FindLocalFoodbank;

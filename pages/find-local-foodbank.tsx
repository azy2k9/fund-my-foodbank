import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';
import { Box, Button, Text, Input, Flex, Center, Checkbox } from '@chakra-ui/react';
import { returnClosestFoodbanks } from '../utils/foodbankSorter';

const center = { lat: 51.5, lng: -0.1 };

const FindLocalFoodbank = () => {
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
        if (isLoaded) {
            setLocation(center);
        }
    }, [isLoaded]);

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
            ? console.log('no foodbanks given')
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
        // navigate to donations page
    };

    if (!isLoaded && location === null) return <div>...loading</div>;
    return (
        <Center>
            <Box width='90vw' m='6'>
                <Box m='3'>
                    <Center fontSize='3xl'>DONOR DEBREIF: You can split your donation...</Center>
                </Box>
                <Flex width='auto' m='4'>
                    <Box m='2'>
                        <GoogleMap
                            zoom={11}
                            options={{
                                streetViewControl: false,
                                mapTypeControl: false,
                                zoomControlOptions: {
                                    position: google.maps.ControlPosition.RIGHT_CENTER,
                                },
                            }}
                            center={location}
                            mapContainerStyle={{ width: '500px', height: '500px' }}
                        >
                            {/* <Marker position={center} /> */}
                            {foodbankMarkers}
                        </GoogleMap>
                    </Box>
                    <Box m='2'>
                        <Text m='2' fontSize='2xl'>
                            Search your local foodbannk here
                        </Text>
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
                            <Input m='2' placeholder='Enter your address or postcode' />
                        </Autocomplete>

                        <Button
                            colorScheme='blue'
                            m='2'
                            onClick={() => {
                                getPosition();
                            }}
                        >
                            Get my location
                        </Button>
                        {displayCheckboxes
                            ? foodbanks.map((foodbank, j) => (
                                  <Box key={j}>
                                      <Checkbox
                                          isChecked={allCheckbox[j].checkboxDefault}
                                          onChange={() => {
                                              markerClick(j);
                                          }}
                                      >
                                          {foodbank.foodbank_name}
                                      </Checkbox>
                                  </Box>
                              ))
                            : ''}
                        <Box m='2'>
                            <Button
                                colorScheme='blue'
                                m='2'
                                onClick={() => {
                                    submitFoodbankChoices();
                                }}
                            >
                                Submit your selection
                            </Button>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </Center>
    );
};
export default FindLocalFoodbank;

import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import {
  Box,
  Button,
  Text,
  Input,
  Flex,
  Center,
  Checkbox,
} from "@chakra-ui/react";
import { returnClosestFoodbanks } from "./foodbankSorter";

function MAP() {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
    libraries,
  });
  // map gets rendred with location
  const [location, setLocation] = useState(null); // setting a val causes error
  // address is the object from google autocomplete
  const [address, setAddress] = useState(null);
  // array that conatins the closest foodbanks
  const [foodbanks, setFoodbanks] = useState(null);
  const [displayCheckboxes, setDisplayCheckboxes] = useState(false);

  useEffect(() => {
    if (location !== null) {
      const myFoodbanks = returnClosestFoodbanks(location.lat, location.lng);
      setFoodbanks(myFoodbanks);
      setDisplayCheckboxes(true);
    }
  }, [location]);

  const getPosition = () => {
    const success = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const error = (err) => {
      console.log("error getting position: ", err);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const foodbankMarkers =
    foodbanks === null
      ? console.log("no foodbanks given")
      : foodbanks.map((foodbank, i) => (
          <Marker
            onClick={() => {
              console.log(i, " has been clicked");
            }}
            key={i}
            icon={{
              url: "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png",
            }}
            position={{
              lat: parseFloat(foodbank.centre_geolocation.lat),
              lng: parseFloat(foodbank.centre_geolocation.lng),
            }}
          />
        ));

  const center = location; //useMemo(() => ({ lat: 44, lng: -80 }), []);
  if (!isLoaded && location === null) return <div>...loading</div>;
  return (
    <Center>
      <Box width="90vw" m="6">
        <Box m="3">
          <Center fontSize="3xl">
            DONOR DEBREIF: You can split your donation...
          </Center>
        </Box>
        <Flex width="auto" m="4">
          <Box m="2">
            <GoogleMap
              zoom={11}
              options={{
                //zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
              }}
              center={center}
              mapContainerStyle={{ width: "300px", height: "400px" }}
            >
              <Marker position={center} />
              {foodbankMarkers}
            </GoogleMap>
          </Box>
          <Box m="2">
            <Text m="2" fontSize="2xl">
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
              <Input m="2" placeholder="Enter your address or postcode" />
            </Autocomplete>

            <Button
              colorScheme="blue"
              m="2"
              onClick={() => {
                getPosition();
              }}
            >
              Get my location
            </Button>
            {displayCheckboxes
              ? foodbanks.map((foodbank, j) => (
                  <Box key={j}>
                    <Checkbox>{foodbank.foodbank_name}</Checkbox>
                  </Box>
                ))
              : ""}
          </Box>
        </Flex>
      </Box>
    </Center>
  );
}
export default MAP;

import { useMemo, useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Box, Container } from "@chakra-ui/react";

function MAP() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
  });
  const [location, setLocation] = useState(null);

  useEffect(() => {
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
  }, []);

  const center = location; //useMemo(() => ({ lat: 44, lng: -80 }), []);
  if (!isLoaded && location === null) return <div>...loading</div>;
  return (
    <Box>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerStyle={{ width: 500, height: 700 }}
      >
        <Marker position={center} />
        <Marker
          icon={{
            url: "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png",
          }}
          position={{ lat: 51.46399677111467, lng: -0.1924867280810752 }}
        />
      </GoogleMap>
    </Box>
  );
}
export default MAP;

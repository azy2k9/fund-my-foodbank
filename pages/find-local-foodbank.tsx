import { useMemo, useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

function MAP() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY,
  });
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // make a function that get gps location
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
  //console.log("my location is: ", location);
  const center = location; //useMemo(() => ({ lat: 44, lng: -80 }), []);
  //console.log(center);
  console.log(location && location);
  if (!isLoaded && location === null) return <div>...loading</div>;
  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={{ width: "100vw", height: "100vw" }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
export default MAP;

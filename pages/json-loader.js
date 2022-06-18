import jsonData from "../foodbank-search-data.json";

export default function JsonLoader() {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  let distance = 50;
  const myLat = 51.462802;
  const myLng = -0.17987;
  jsonData.forEach((obk) => {
    //const city = obk.foodbank_information.geolocation.city;
    //const country = obk.foodbank_information.geolocation.country;
    //console.log(`Counrty: ${country} and City: ${city} `);
    const boroughName = obk.foodbank_information.name;
    const boroughLat = obk.foodbank_information.geolocation.lat;
    const boroughLng = obk.foodbank_information.geolocation.lng;
    /**
     * foodbank_information represents an area like richmond/waterloo
     * will use lat/lng from information and return the closest object
     */
    const newDistance = getDistanceFromLatLonInKm(
      myLat,
      myLng,
      boroughLat,
      boroughLng
    );
    if (newDistance < distance) {
      distance = newDistance;
      console.log("Distance: ", distance, " at area : ", boroughName);
    }
  });
  return (
    <div>
      <h2>json loaded</h2>
    </div>
  );
}

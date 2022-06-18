import jsonData from "../foodbank-search-data.json";

export function returnClosestFoodbanks(myLat, myLng) {
  // Setting initial distance in km
  let distance = 30;
  // initializing array which will contain the closest foodbanks
  let foodbank_list = [];

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

  jsonData.forEach((obk) => {
    const boroughName = obk.foodbank_information.name;
    const boroughFoodbanks = obk.foodbank_centre;
    const boroughLat = obk.foodbank_information.geolocation.lat;
    const boroughLng = obk.foodbank_information.geolocation.lng;

    const newDistance = getDistanceFromLatLonInKm(
      myLat,
      myLng,
      boroughLat,
      boroughLng
    );
    if (newDistance < distance) {
      foodbank_list.push(boroughFoodbanks);
      distance = newDistance;
      // keep array length to 3
      if (foodbank_list.length > 3) {
        foodbank_list = foodbank_list.slice(1);
      }
    }
  });
  // format the foodbank_list to return object within the arrays
  let new_foodbank_list = [];
  foodbank_list.forEach((arr) => {
    new_foodbank_list.push(...arr);
  });
  // add distance to each foodbank object
  new_foodbank_list.forEach((foodbank) => {
    const distanceFromLocation = getDistanceFromLatLonInKm(
      myLat,
      myLng,
      parseFloat(foodbank.centre_geolocation.lat),
      parseFloat(foodbank.centre_geolocation.lng)
    );
    foodbank.distanceToMe = distanceFromLocation;
  });
  // sort food banks using distance
  new_foodbank_list.sort(
    (a, b) => parseFloat(a.distanceToMe) - parseFloat(b.distanceToMe)
  );

  return new_foodbank_list;
}

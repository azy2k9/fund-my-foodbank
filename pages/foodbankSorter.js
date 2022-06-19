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
    const foodbankMain = obk.foodbank_information;
    const boroughName = obk.foodbank_information.name;
    let boroughFoodbanks = obk.foodbank_centre;
    const boroughLat = obk.foodbank_information.geolocation.lat;
    const boroughLng = obk.foodbank_information.geolocation.lng;

    const newDistance = getDistanceFromLatLonInKm(
      myLat,
      myLng,
      boroughLat,
      boroughLng
    );
    if (newDistance < distance) {
      // passing main foodbank to array of foodbanks for the borough
      const mainBoroughFoodbank = {
        foodbank_name: foodbankMain.name,
        centre_geolocation: foodbankMain.geolocation,
        foodbank_telephone_number: foodbankMain.telephone_number,
      };
      // if foodbank center is false create a new array and add the main foodbank
      if (boroughFoodbanks == false) {
        boroughFoodbanks = [mainBoroughFoodbank];
      } else {
        if (
          boroughFoodbanks.some(
            (val) => val.foodbank_name !== mainBoroughFoodbank.foodbank_name
          )
        ) {
          boroughFoodbanks.push(mainBoroughFoodbank);
        }
      }
      foodbank_list.push(boroughFoodbanks);
      distance = newDistance;
      // keep array length to 3
      if (foodbank_list.length > 5) {
        foodbank_list = foodbank_list.slice(1);
      }
    }
  });

  // turn 2d array into 1d
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

  if (new_foodbank_list.length > 7) {
    return new_foodbank_list.splice(0, 6);
  }
  return new_foodbank_list;
}

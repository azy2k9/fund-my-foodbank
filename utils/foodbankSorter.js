import jsonData from './foodbank-search-data.json';

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
        let boroughFoodbanks = obk.foodbank_centre;

        const newDistance = getDistanceFromLatLonInKm(myLat, myLng, boroughLat, boroughLng);
        if (newDistance < 30) {
            // passing main foodbank to array of foodbanks for the borough
            const mainBoroughFoodbank = {
                foodbank_name: foodbankMain.name,
                centre_geolocation: foodbankMain.geolocation,
                foodbank_telephone_number: foodbankMain.telephone_number,
            };
            // if foodbank center is false create a new array and add the main foodbank
            if (boroughFoodbanks == false) {
                boroughFoodbanks = [mainBoroughFoodbank];
            }

            foodbank_list.push(...boroughFoodbanks);
        }
    });

    foodbank_list.forEach((foodbank) => {
        const distanceFromLocation = getDistanceFromLatLonInKm(
            myLat,
            myLng,
            parseFloat(foodbank.centre_geolocation.lat),
            parseFloat(foodbank.centre_geolocation.lng),
        );
        foodbank.distanceToMe = distanceFromLocation;
    });

    // sort food banks using distance
    foodbank_list.sort((a, b) => parseFloat(a.distanceToMe) - parseFloat(b.distanceToMe));

    if (foodbank_list.length > 7) {
        return foodbank_list.splice(0, 6);
    }
    return foodbank_list;
}

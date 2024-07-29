import { GeoHash } from "geohash";

var apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
};

var x = {}

async function getLocation() {
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x = {
    "Latitude": position.coords.latitude,
    "Longitude": position.coords.longitude
  };
  //x.innerHTML = "Latitude: " + position.coords.latitude +
  //"<br>Longitude: " + position.coords.longitude;
}

export async function callAllEvents(keyword) {
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiKey + "&countryCode=US"
    if (keyword)
      url += "&keyword=" + keyword;
    return await fetch(url)
      .then((data) => data.json())
      //.then((data) => JSON.stringify(data))
      .then((data) => {
        //console.log(data);
        const temp = data._embedded.events;
        //setAll(temp);
        return temp;
      })
      .catch()
      //.finally(console.log("All Events is done"));
    ;
};

export async function callMusic(keyword) {
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiKey + "&countryCode=US&segmentId=KZFzniwnSyZfZ7v7nJ";
    if (keyword)
        url += "&keyword=" + keyword;
    return await fetch(url)
      .then((data => data.json()))
      .then((data) => {
        const temp = data._embedded.events;
        //setMusic(temp);
        return temp;
      })
      //.catch(setMusic([]))
      //.finally(console.log("Music is done"));
    ;
};

export async function callSports(keyword) {
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiKey + "&countryCode=US&segmentId=KZFzniwnSyZfZ7v7nE";
    if (keyword)
        url += "&keyword=" + keyword;
    return await fetch(url)
      .then((data => data.json()))
      .then((data) => {
        //console.log(data);
        const temp = data._embedded.events;
        //setSports(temp);
        return temp;
      })
      //.catch(setSports([]))
      //.finally(console.log("Sports is done"));
  };

export async function callArtsAndTheater(keyword) {
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiKey + "&countryCode=US&segmentId=KZFzniwnSyZfZ7v7na";
    if (keyword)
        url += "&keyword=" + keyword;
    return await fetch(url)
      .then((data => data.json()))
      .then((data) => {
        //console.log(data);
        const temp = data._embedded.events;
        //setArts(temp);
        return temp;
      })
      //.catch(setArts([]))
      //.finally(console.log("Arts is done"));
    ;
};

export async function callSearchData(category, keyword) {
  switch (category) {
    case "Venue":
      category = "venueId";
      await getVenueID(keyword).then((e) => keyword = e[0].id);
      break;
    case "City":
      category = "city";
      break;
    case "Genre":
      category = "classificationName";
      break;
    default:
      break;
  }
  var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiKey + "&countryCode=US&" + category + "=" + keyword;
  
  
  //var hash = GeoHash.encodeGeoHash(loc.lat, loc.long);
  await getLocation();
  //url += "&geoPoint=" + x.longitude + "," + x.latitude;
  
  console.log("hash =" + url);
  console.log(x);


  return await fetch(url)
    .then((data => data.json()))
    .then((data) => {
      const temp = data._embedded.events;
      //setArts(temp);
      console.log("data has been retrieved from SearchData function");
      return temp;
    })
    //.catch(setArts([]))
    //.finally(console.log("Arts is done"));
  ;
};

async function getVenueID(keyword){
  var url = "https://app.ticketmaster.com/discovery/v2/venues.json?apikey=" + apiKey + "&keyword=" + keyword;
  //var url = "https://app.ticketmaster.com/discovery/v2/venues?apikey=JTJJFmLxlsxSdmmeVKJKK9YsS5yF4osm&keyword=Lincoln%20Financial%20Field";

  return await fetch(url)
    .then((data => data.json()))
    .then((data) => {
      const temp = data._embedded.venues;
      return temp;
    })
  ;
};
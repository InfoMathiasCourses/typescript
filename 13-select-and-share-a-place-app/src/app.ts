import axios from "axios";

declare var ol: any;

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const searchAddressHandler = (e: Event) => {
  e.preventDefault();

  const enteredAddress = addressInput.value;

  // Using nominatim API instead of google maps (like in the course) to avoid setting up billing account
  axios
    .get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURI(
        enteredAddress
      )}&format=json`
    )
    .then((response) => {
      const data = response.data[0];
      const lat = data.lat;
      const long = data.lon;

      const coordinates = { lat: lat, long: long };
      console.log(coordinates);

      document.getElementById("map")!.innerHTML = "";
      new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(),
          }),
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([coordinates.long, coordinates.lat]),
          zoom: 16,
        }),
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

form.addEventListener("submit", searchAddressHandler);

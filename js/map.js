import { locations } from "./locations.js";

console.log("Map JS loaded");
console.log(locations);

const randomLocation = locations[
  Math.floor(Math.random() * locations.length)
];

const map = L.map("map").setView(
  [randomLocation.lat, randomLocation.lng],
  17
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

L.marker([randomLocation.lat, randomLocation.lng])
  .addTo(map)
  .bindPopup(`
    <strong>${randomLocation.name}</strong><br>
    Category: ${randomLocation.category}
  `)
  .openPopup();
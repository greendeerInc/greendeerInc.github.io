import { locations } from "./locations.js";

const randomLocation = locations[
  Math.floor(Math.random() * locations.length)
];

const map = L.map("map").setView(
  [randomLocation.lat, randomLocation.lng],
  17
);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const avatarIcon = L.icon({
  iconUrl: "../images/avatar.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

L.marker([randomLocation.lat, randomLocation.lng], {
  icon: avatarIcon
})
  .addTo(map)
  .bindPopup(`
    <strong>${randomLocation.name}</strong><br>
    Category: ${randomLocation.category}
  `)
  .openPopup();
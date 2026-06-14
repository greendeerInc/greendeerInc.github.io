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

const avatarIcon = L.divIcon({
  className: "avatar-marker",
  html: `
    <div class="avatar-wrapper">
      <img src="avatars/Anna.png" alt="avatar">
    </div>
  `,
  iconSize: [32, 32],     // smaller marker
  iconAnchor: [16, 16],   // center the marker
  popupAnchor: [0, -16]
});

L.marker(
  [randomLocation.lat, randomLocation.lng],
  { icon: avatarIcon }
)
.addTo(map)
.bindPopup(randomLocation.name);

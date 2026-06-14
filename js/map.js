import { locations } from "./locations.js";

const map = L.map("map").setView(
  [36.0015, -78.9395], // Center on Duke West Campus
  16
);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const people = [
  {
    name: "Anna",
    avatar: "avatars/Anna.png",
    locationId: "perkins-library",
    status: "Studying",
    leavingAt: "4:30 PM",
    nextBreakIn: "1 hour 15 minutes"
  },
  {
    name: "Ryan",
    avatar: "avatars/Ryan.png",
    locationId: "brodhead-center",
    status: "Eating",
    leavingAt: "2:15 PM",
    nextBreakIn: "45 minutes"
  },
  {
    name: "Mark",
    avatar: "avatars/Mark.png",
    locationId: "wilson-gym",
    status: "At the gym",
    leavingAt: "6:00 PM",
    nextBreakIn: "2 hours"
  },
  {
    name: "Sebastian",
    avatar: "avatars/Sebastian.png",
    locationId: "edens-quad(2A)",
    status: "Sleeping",
    leavingAt: "6:00 PM",
    nextBreakIn: "2 hours"
  }
];

people.forEach(person => {
  const personLocation = locations.find(
    location => location.id === person.locationId
  );

  if (!personLocation) return;

  const avatarIcon = L.divIcon({
    className: "avatar-marker",
    html: `
      <div class="avatar-wrapper">
        <img src="${person.avatar}" alt="${person.name}">
      </div>
    `,
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    popupAnchor: [0, -32]
  });

  const popupContent = `
    <div class="person-popup">
      <h3>${person.name}</h3>
      <p><strong>Where:</strong> ${personLocation.name}</p>
      <p><strong>Status:</strong> ${person.status}</p>
      <p><strong>There until:</strong> ${person.leavingAt}</p>
      <p><strong>Next break in:</strong> ${person.nextBreakIn}</p>
    </div>
  `;

  L.marker(
    [personLocation.lat, personLocation.lng],
    { icon: avatarIcon }
  )
    .addTo(map)
    .bindPopup(popupContent);
});

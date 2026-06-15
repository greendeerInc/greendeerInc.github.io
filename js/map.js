import { locations } from "./locations.js";
import { protectPage } from "./auth.js";
import { db, auth } from "./firebase-config.js";
import {
    collection,
    getDocs,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

protectPage();

const map = L.map("map").setView(
  [36.0015, -78.9395],
  16
);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const AVATAR_SIZE = 64;

async function loadUsersOnMap() {
  try {
    const usersSnapshot = await getDocs(
      collection(db, "users")
    );

    usersSnapshot.forEach((docSnap) => {
      if (
        auth.currentUser &&
        docSnap.id === auth.currentUser.uid
      ) {
        return;
      }

      const user = {
        uid: docSnap.id,
        ...docSnap.data()
      };

      addUserMarker(user);
    });

  } catch (error) {
    console.error("Error loading users on map:", error);
  }
}

function addUserMarker(user) {

  if (!user.locationId) {
    console.warn(
      `${user.profileName} has no locationId`
    );
    return;
  }

  const personLocation = locations.find(
    location => location.id === user.locationId
  );

  if (!personLocation) {
    console.warn(
      "Location not found:",
      user.locationId
    );
    return;
  }

  const avatarIcon = L.divIcon({
    className: "avatar-marker",
    html: `
      <div class="avatar-wrapper">
        <img
          src="avatars/${user.avatar || "1.png"}"
          alt="${user.profileName || "User"}"
        >
      </div>
    `,
    iconSize: [64, 64],
    iconAnchor: [32, 32]
  });

  L.marker(
    [personLocation.lat, personLocation.lng],
    { icon: avatarIcon }
  )
  .addTo(map)
  .bindPopup(`
    <div class="person-popup">
      <h3>${user.profileName || "Unknown User"}</h3>
      <p>${personLocation.name}</p>
      <p>${user.status || "No status"}</p>
    </div>
  `);
}

loadUsersOnMap();
import { locations } from "./locations.js";
import { db, auth } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
  const personLocation = locations.find(
    location => location.id === user.locationId
  );

  if (!personLocation) {
    console.warn("Location not found for user:", user);
    return;
  }

  const avatarIcon = L.divIcon({
    className: "avatar-marker",
    html: `
      <div class="avatar-wrapper">
        <img src="${user.avatar || "avatars/default.png"}" alt="${user.displayName || "User"}">
      </div>
    `,
    iconSize: [AVATAR_SIZE, AVATAR_SIZE],
    iconAnchor: [AVATAR_SIZE / 2, AVATAR_SIZE / 2],
    popupAnchor: [0, -AVATAR_SIZE / 2]
  });

  const popupContent = `
    <div class="person-popup">
      <h3>${user.displayName || user.name || "Unknown User"}</h3>
      <p><strong>Where:</strong> ${personLocation.name}</p>
      <p><strong>Status:</strong> ${user.status || "Unknown"}</p>
      <p><strong>There until:</strong> ${user.leavingAt || "Unknown"}</p>
      <p><strong>Next break in:</strong> ${user.nextBreakIn || "Unknown"}</p>
    </div>
  `;

  L.marker([personLocation.lat, personLocation.lng], {
    icon: avatarIcon
  })
    .addTo(map)
    .bindPopup(popupContent);
}

loadUsersOnMap();
import L from 'leaflet';

/* world top left */
// 76.248809, -168.846000
/* world bottom right */
// -58.838593, 179.914776

// const corner1 = L.latLng(-34.096182, 18.451022);
// const corner2 = L.latLng(-34.107867, 18.495375);

const corner3 = L.latLng(76.248809, -168.846000);
const corner4 = L.latLng(-58.838593, 179.914776);

export const bounds = new L.latLngBounds(corner3, corner4);

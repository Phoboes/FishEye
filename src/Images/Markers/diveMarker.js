import L from 'leaflet';

const diveMarker = new L.icon({
  iconUrl: require("../../Images/cross.svg"),
  iconSize: new L.point(20,20),
  iconAnchor: [10,10],
  popupAnchor: [0, -10],
  shadowSize: null,
  shadowAnchor: null,
  shadowUrl: null
});


  export default diveMarker;
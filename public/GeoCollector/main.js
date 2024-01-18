var googleLayerSatellite = new ol.layer.Tile({
  title: "Google Satellite",
  type: "base",
  visible: false,
  source: new ol.source.TileImage({
    url: "https://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}",
  }),
});
var googleLayerRoadmap = new ol.layer.Tile({
  title: "Google Road Map",
  type: "base",
  visible: true,
  source: new ol.source.TileImage({
    url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  }),
});
window.map = new ol.Map({
  target: "map-container",
  layers: [googleLayerRoadmap, googleLayerSatellite],
  view: new ol.View({
    projection: "EPSG:3857",
    center: ol.proj.fromLonLat([88.4876211, 22.5855179]),
    zoom: 15,
    minZoom: 4,
    maxZoom: 22,
  }),
});

//myLocationlayer
const myLocationSrc = new ol.source.Vector();
const myLocationlayer = new ol.layer.Vector({
  source: myLocationSrc,
});

map.addLayer(myLocationlayer);

navigator.geolocation.watchPosition(
  function (pos) {
    const coords = [pos.coords.longitude, pos.coords.latitude];
    const accuracy = ol.geom.Polygon.circular(coords, pos.coords.accuracy);
    myLocationSrc.clear(true);
    myLocationSrc.addFeatures([
      new ol.Feature(
        accuracy.transform("EPSG:4326", map.getView().getProjection())
      ),
      new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coords))),
    ]);
  },
  function (error) {
    console.log(`ERROR: ${error.message}`);
  },
  {
    enableHighAccuracy: true,
  }
);

//Locate me Control
const locate = document.createElement("div");
locate.className = "ol-control ol-unselectable locate ";
locate.innerHTML = '<button title="Locate me">◎</button>';
locate.addEventListener("click", function () {
  if (!myLocationSrc.isEmpty()) {
    map.getView().fit(myLocationSrc.getExtent(), {
      maxZoom: 18,
      duration: 500,
    });
  }
});
map.addControl(
  new ol.control.Control({
    element: locate,
  })
);

//baseMap Control
const baseMap = document.createElement("div");
baseMap.className = "ol-control baseMap";
baseMap.innerHTML = `<select  onchange="getSelectedBaseMap(this)" id="baseMapSelect"> 
<option value="None">None</option> 
<option value="googleLayerSatellite">Satellite</option>
<option selected value="googleLayerRoadmap">Roadmap</option> 

</select>`;

function getSelectedBaseMap(selectObject) {
  if (selectObject.value == "googleLayerSatellite") {
    googleLayerSatellite.setVisible(true);
    googleLayerRoadmap.setVisible(false);
  } else if (selectObject.value == "googleLayerRoadmap") {
    googleLayerSatellite.setVisible(false);
    googleLayerRoadmap.setVisible(true);
  } else if (selectObject.value == "None") {
    googleLayerSatellite.setVisible(false);
    googleLayerRoadmap.setVisible(false);
  }
}
map.addControl(
  new ol.control.Control({
    element: baseMap,
  })
);

// declare vars to populate later
var routetitle,
  routeDescription,
  routeFeatures,
  routeScreenshot,
  routePNG,
  tags;
function saveLocal() {
  var allFeatures = drawsource.getFeatures();
  var format = new ol.format.GeoJSON();
  routeFeatures = format.writeFeatures(allFeatures, {
    featureProjection: "EPSG:3857",
  });
  routeFeatures = JSON.parse(routeFeatures);
  routeFeatures.crs = {
    type: "name",
    properties: {
      name: "EPSG:3857",
    },
  };
  console.log(JSON.stringify(routeFeatures));

  function exportJson(featuresCollection) {
    var txtArray = [];
    txtArray.push(JSON.stringify(featuresCollection));

    // Here I use the saveAs library to export the JSON as *.txt file

    var blob = new Blob(txtArray, { type: "text/json;charset=utf8" });
    saveAs(blob, "task_001" + ".json");
  }

  // exportJson(routeFeatures);
}

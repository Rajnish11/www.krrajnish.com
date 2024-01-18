window.drawflag = false;

window.drawsource = new ol.source.Vector();
let draw,
  snap,
  modify,
  objProp = {};

$("#drawBtn").click(function () {
  $("#drawObjSelect").toggle();
  if ($("#drawObjSelect").is(":visible")) {
    $("#objTypeSelect").on("change", function () {
      if ($("#objTypeSelect option:selected").val() == "defult") {
        map.removeInteraction(draw);
        map.removeInteraction(snap);
        map.removeInteraction(modify);
      } else {
        map.removeInteraction(draw);
        map.removeInteraction(snap);
        map.removeInteraction(modify);

        const newObjLayer = new ol.layer.Vector({
          source: drawsource,
          style: styleFunction,
        });

        // Limit multi-world panning to one world east and west of the real world.
        // Geometry coordinates have to be within that range.
        const extent = ol.proj.get("EPSG:3857").getExtent().slice();
        extent[0] += extent[0];
        extent[2] += extent[2];
        map.addLayer(newObjLayer);
        const typeSelect = document.getElementById("objTypeSelect");
        var Object_Name = $("#objTypeSelect option:selected").text();

        function addInteractions() {
          var geotype = typeSelect.value;
          // var Object_Name = $("#objTypeSelect option:selected").text();
          // console.log(Object_Name, geotype);
          draw = new ol.interaction.Draw({
            source: drawsource,
            type: geotype,
          });
          map.addInteraction(draw);
          snap = new ol.interaction.Snap({ source: drawsource });
          map.addInteraction(snap);

          draw.on("drawstart", function () {
            drawflag = true;
          });

          draw.on("drawend", function (evt) {
            drawflag = false;
            var feature = evt.feature;

            var coordinates = feature.getGeometry().getLastCoordinate();

            // console.log(Object_Name, geotype);
            var drawBtnDataTemplet = `${localStorage.getItem(
              Object_Name
            )}<!--Popup Control-->
                  <div id="drawPopupControl" style="margin-top: 15px; float: left; width: 50%;">
                  <!-- <button id="objdeleteButton" style="background:#fff;color: red;border-radius: 5px"> <i class="fa fa-trash"></i> Delete </button> -->
                  </div>
                  <div style="margin-top: 15px;text-align:right">
                  <button onclick="objcancelProp()" id="cancelButton" style="background: #fff; border-radius: 15px 0 0 15px" >Cancel</button>
                  <button onclick="objsaveProp()" id="objsaveButton" style="color:white;background: forestgreen;border-radius: 0 15px 15px 0">SAVE</button>
                  </div>
            
            `;
            content.innerHTML = "";
            content.innerHTML = drawBtnDataTemplet;

            popup.setPosition(coordinates);

            getPreviousFill(objProp);

            // //do you want to set other properties?
            // objNetworkType = document.getElementById(
            //   "objNetworkTypeSelect"
            // ).value;
            //

            var creationDate = new Date().toLocaleDateString();

            feature.setProperties({
              Form_Name: Object_Name,
              creationDateTime: creationDate,
            });
          });
        }

        /**
         * Handle change event.
         */

        addInteractions();
      }
    });
  } else {
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    map.removeInteraction(modify);
  }
});

function objcancelProp() {
  popupCloser();
  removeLastFeature();
  showWaringAlert("Object Not added");
}
function objsaveProp() {
  $("#objProp_Form :input").each(function () {
    if ($(this).attr("name").length > 0) {
      objProp[$(this).attr("name")] = $(this).val();
    }
  });
  var features = drawsource.getFeatures();
  var lastFeature = features[features.length - 1];
  lastFeature.setProperties(objProp);
  setPreviousFill(objProp);
  popupCloser();

  saveIndexedDB(lastFeature);
  // $("#objTypeSelect").val("defult").change();
}
//drawModify btn on click
$("#drawModify").click(function () {
  modify = new ol.interaction.Modify({ source: drawsource });
  map.addInteraction(modify);
});
//drawUndu btn on click
$("#drawUndo").click(function () {
  if (drawflag) {
    draw.removeLastPoint();
  } else {
    removeLastFeature();
  }
});
//drawSave btn on click
$("#drawSave").click(function () {
  saveLocal();
});

function removeLastFeature() {
  var features = drawsource.getFeatures();
  var lastFeature = features[features.length - 1];
  drawsource.removeFeature(lastFeature);
}

function saveIndexedDB(feature) {
  properties = feature.getProperties();
  delete properties.geometry;

  corrd = ol.proj.toLonLat(feature.getGeometry().getCoordinates());

  properties["Latitude"] = corrd[1];
  properties["Longitude"] = corrd[0];

  addData(properties);
}

var scriptURL =
  "https://script.google.com/macros/s/AKfycbz-aWieG1yUFXxih1hzjExiuEtOCbWZCaFMjIZNBpgCbyHmoA5BlRiUFoXxyxgzaVDH/exec";
function addData(properties) {
  // var data = "";
  // $.each(properties, function (index, element) {
  //   var superator = "&";
  //   var eq = "=";
  //   // element.replace(/ /g, "%20");
  //   data += index + eq + element + superator;
  // });
  // finalURL = scriptURL + data;
  // console.log(finalURL);
  properties["action"] = "Write";

  $.get(scriptURL, properties, function (data, status) {
    showSuceessAlert(data);
    console.log("Data: " + data + "\nStatus: " + status);
  });
}

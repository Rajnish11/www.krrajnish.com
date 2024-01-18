// defutstyle

colorList = { LV: "#F7A71B", MV: "#0000FF", HV: "#FF4FFF", EHV: "#ff0000" };

function styleFunction(feature) {
  Object_Name = feature.get("Form_Name");
  Network_Type = feature.get("Network Type");
  id = Object_Name;

  var style;
  if (false)
    style = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
          color: colorList[Network_Type],
        }),
        stroke: new ol.style.Stroke({
          color: colorList[Network_Type],
          width: 1,
        }),
      }),
      text: new ol.style.Text({
        font: "20px serif",
        text: id,
        placement: "point",
        offsetX: 10,
        offsetY: 10,
        fill: new ol.style.Fill({
          color: "#000",
        }),
      }),
    });
  else
    style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: "rgba(41, 225, 242, 0.2)",
      }),
      stroke: new ol.style.Stroke({
        color: "#29e1f2",
        width: 3,
      }),
      // image: new ol.style.Circle({
      //   radius: 7,
      //   fill: new ol.style.Fill({
      //     color: "rgba(41, 225, 242,0.6)",
      //   }),
      //   stroke: new ol.style.Stroke({
      //     color: "rgba(41, 225, 242,0.8)",
      //     width: 1,
      //   }),
      // }),
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
          color: "#F7A71B",
        }),
        stroke: new ol.style.Stroke({
          color: "#F7A71B",
          width: 1,
        }),
      }),
      text: new ol.style.Text({
        font: "20px serif",
        text: id,
        placement: "point",

        offsetX: 10,
        offsetY: 10,
        fill: new ol.style.Fill({
          color: "#000",
        }),
      }),
    });
  return [style];
}

window.defaultStyle = {
  Point: [
    new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        opacity: 1,
        src: "./img/pin.png",
      }),
    }),
  ],
  LineString: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#F7A71B", //'#f00',
        width: 3,
      }),
    }),
  ],
  Polygon: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#FF1493", //'#00f',
        width: 2,
      }),
    }),
  ],
  Pole_LV: [
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({ color: "#ffcc33" }),
        stroke: new ol.style.Stroke({
          color: "#cf4638",
          width: 2,
        }),
      }),
    }),
  ],
  Pole_MV: [
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({ color: "#0000FF" }),
        stroke: new ol.style.Stroke({
          color: "#cf4638",
          width: 2,
        }),
      }),
    }),
  ],
  Pole_HV: [
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({ color: "#f00" }),
        stroke: new ol.style.Stroke({
          color: "black",
          width: 2,
        }),
      }),
    }),
  ],
  Meter_LV: [
    new ol.style.Style({
      image: new ol.style.Icon({
        opacity: 1,
        src: "./img/pin.png",
      }),
    }),
  ],
  Meter_MV: [
    new ol.style.Style({
      image: new ol.style.Icon({
        opacity: 1,
        src: "./img/pin.png",
      }),
    }),
  ],
  Meter_HV: [
    new ol.style.Style({
      image: new ol.style.Icon({
        opacity: 1,
        src: "./img/pin.png",
      }),
    }),
  ],
  Wire_LV: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#ffcc33",
        width: 3,
      }),
    }),
  ],
  Wire_MV: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#0000FF",
        width: 3,
      }),
    }),
  ],
  Wire_HV: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#f00",
        width: 3,
      }),
    }),
  ],
  Cable_LV: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#ffcc33",
        lineDash: [10, 10],
        width: 3,
      }),
    }),
  ],
  Cable_MV: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#0000FF",
        lineDash: [10, 10],
        width: 3,
      }),
    }),
  ],
  Cable_HV: [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#f00",
        lineDash: [10, 10],
        width: 3,
      }),
    }),
  ],
  Transformer_LV: [
    new ol.style.Style({
      image: new ol.style.Icon({
        opacity: 1,
        src: "./img/pin.png",
      }),
    }),
  ],
  Transformer_MV: [
    new ol.style.Style({
      image: new ol.style.Icon({
        opacity: 1,
        src: "./img/pin.png",
      }),
    }),
  ],
  Transformer_HV: [
    new ol.style.Style({
      image: new ol.style.Icon({
        opacity: 1,
        src: "./img/pin.png",
      }),
    }),
  ],
};

//defult Style End

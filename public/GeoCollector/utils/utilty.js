var orgConfigURL =
  "https://firebasestorage.googleapis.com/v0/b/geofy-ff511.appspot.com/o/config_file%2Fgeocollector%2Forg_Config.json?alt=media";

function setDataToContainer(m_orgConfigDetailes) {
  $.each(m_orgConfigDetailes.list_of_obj, function (index, element) {
    // Object Type Add

    $("#objTypeSelect").append(
      `<option value="${element.Geometry_Type}">${element.Object_Name}</option>`
    );
  });
  // Network Type Add from 1st Object

  $.each(m_orgConfigDetailes.Network_Type, function (index, Voltage_Type) {
    $("#objNetworkTypeSelect").append(`<option value="${Voltage_Type}">
                                               ${Voltage_Type}
                                          </option>`);
  });
}
if (
  localStorage.getItem("orgConfigDetailes") === undefined ||
  localStorage.getItem("orgConfigDetailes") === null
) {
  $.getJSON(orgConfigURL).done(function (data) {
    orgConfigData = data;

    setDataToContainer(data);
    localStorage.setItem("orgConfigDetailes", JSON.stringify(orgConfigData));
  });
} else {
  l_orgConfigDetailes = JSON.parse(localStorage.getItem("orgConfigDetailes"));

  setDataToContainer(l_orgConfigDetailes);
}

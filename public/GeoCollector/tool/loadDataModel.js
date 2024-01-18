var orgConfigURL =
  "https://firebasestorage.googleapis.com/v0/b/geofy-ff511.appspot.com/o/config_file%2Fgeocollector%2Forg_Config.json?alt=media";

var orgConfigDetailes;

if (localStorage.getItem("dataModelSave") === "yes") {
} else {
  if (
    localStorage.getItem("orgConfigDetailes") === undefined ||
    localStorage.getItem("orgConfigDetailes") === null
  ) {
    $.getJSON(orgConfigURL).done(function (data) {
      orgConfigDetailes = data;
      buildPopupList();
    });
  } else {
    orgConfigDetailes = JSON.parse(localStorage.getItem("orgConfigDetailes"));
    buildPopupList();
  }
}

function buildPopupList() {
  // all Datamodel Level
  $.each(orgConfigDetailes.list_of_obj, function (index, list_of_obj) {
    Object_Name = list_of_obj.Object_Name;
    Data_Model_URL = list_of_obj.Data_Model_URL;

    $.getJSON(Data_Model_URL).always(function (res) {
      $.each(res, function (i, j) {
        Object_Name = i;
        objFields = j;

        //object level loop

        buildTable = [];

        objFields.forEach((element) => {
          //Field Level
          Field_Name = element.Field_Name;
          Field_Id = Field_Name.replace(/ /g, "");
          Field_Type = element.Field_Type;
          selectOption = element.option;

          if (Field_Type === "select") {
            selectOption_Templet = [];
            selectOption.forEach((option) => {
              selectOption_Templet.push(
                `<option value="${option}">${option}</option>`
              );
            });

            selectType_Templet = `<tr><td>${Field_Name}</td><td><select id="${Field_Id}" name="${Field_Name}">${selectOption_Templet.join(
              ""
            )}</select></td></tr>`;

            buildTable.push(selectType_Templet);
          } else if (Field_Type === "input") {
            inputType_Templet = `<tr><td>${Field_Name}</td><td><input id="${Field_Id}" name="${Field_Name}" /></td></tr>`;

            buildTable.push(inputType_Templet);
          }
        });

        // Creating Final Popup HTML
        popupHTML = `<h4 id="ObjectName">${Object_Name} Details</h4> <div class="drawtable"><form id="objProp_Form">
        <table>${buildTable.join("")}</table> </form></div>`;
      });
      Object_popup_List = {};
      Object_popup_List[Object_Name] = popupHTML;
      localStorage.setItem(Object_Name, popupHTML);
    });
  });
  localStorage.setItem("dataModelSave", "yes");
}

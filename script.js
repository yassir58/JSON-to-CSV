const csv_val = document.getElementById("csv_input");
const json_val = document.getElementById("json_input");
const tocsv_btn = document.getElementById("tocsv-btn");
const tojson_btn = document.getElementById("tojson-btn");
const csv_erea = document.getElementById("csv-erea");
const json_erea = document.getElementById("json-erea");
const output_erea = document.getElementById("output-erea");
const js_result = document.getElementById("js_result");
const testCsv = document.getElementById("test");
const json_warrn = document.getElementById("json_warning");
const csv_warrn = document.getElementById("csv_warning");
const show_csv = document.getElementById("show_csv");
const show_json = document.getElementById("show_json");
const csv_file = document.getElementById("csv_file");
const json_file = document.getElementById("json_file");
const imp_json = document.getElementById("imp_json");
const imp_csv = document.getElementById("imp_csv");
let csb_backup;
const json_placeholder = 'example \n { \n "key":"value",\n"key":"value"';

//// show to csv to json convertor
function toJSON() {
  csv_erea.style.display = "none";
  json_erea.style.display = "grid";
  js_result.innerHTML = "";
  output_erea.style.display = "none";
  testCsv.innerHTML = "";
}
show_json.addEventListener("click", toJSON);
//// show to json convertor
function toCSV() {
  csv_erea.style.display = "grid";
  json_erea.style.display = "none";
  js_result.innerHTML = "";
  output_erea.style.display = "none";
  testCsv.innerHTML = "";
}
show_csv.addEventListener("click", toCSV);
// read and import csv file
function readCSV() {
  if (csv_file.files && csv_file.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      csv_val.value = e.target.result;
    };

    reader.readAsBinaryString(csv_file.files[0]);
  }
}
//// read and import json file
function readJSON() {
  if (json_file.files && json_file.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      json_val.value = e.target.result;
    };

    reader.readAsBinaryString(json_file.files[0]);
  }
}

////to csv convertor function

function conToCsv() {
  //// make sure parsing the JSON is not generate an err
  try {
    JSON.parse(json_val.value);
  } catch (err) {
    //// if the JSON parsing genrate an err stop execution
    json_warrn.innerHTML = err.message;
  } finally {
    let obj = JSON.parse(json_val.value);
    json_warrn.innerHTML = "";
    for (const prop in obj) {
      testCsv.innerHTML += `<li>${prop},${obj[prop]}</li>`;
    }

    output_erea.style.display = "block";
  }
}

//to json coverter
function conToJson() {
  let arrVal = csv_val.value.split("\n");
  let currArr = [];
  let evenItems = [];
  let oddItems = [];
  let obj = {};
  arrVal.forEach((item) => {
    currArr.push(item.split(","));
  });
  currArr = currArr.reduce((a, b) => {
    return a.concat(b);
  });
  currArr.filter((item) => {
    if (currArr.indexOf(item) % 2 === 0) {
      evenItems.push(item);
    } else {
      oddItems.push(item);
    }
  });
  for (let i = 0; i < evenItems.length; i++) {
    obj[evenItems[i]] = oddItems[i];
  }
  js_result.innerHTML = JSON.stringify(obj).replace(/,/gi,",<br/>");
  output_erea.style.display = "block";
  console.log(evenItems);
  //// validate csv input

  if (Object.keys(obj).length <= 1) {
    csv_warrn.innerHTML = "this is not valide a csv format";
  }
}
////// to csv event listener
tocsv_btn.addEventListener("click", conToCsv);
tojson_btn.addEventListener("click", conToJson);

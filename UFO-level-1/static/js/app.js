// from data.js
var tableData = data;

var tbody = d3.select("tbody");
var resetbtn = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]
var button = d3.select("#filter-btn");
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");
var inputField3 = d3.select("#state");
var inputField4 = d3.select("#country");
var inputField5 = d3.select("#shape");

var populate = (dataInput) => {
  dataInput.forEach(ufo_sightings => {
    var row = tbody.append("tr");
    columns.forEach(column => row.append("td").text(ufo_sightings[column])
    )
  });
}

populate(data);

button.on("click", () => {
  d3.event.preventDefault();
  var inputDate = inputField1.property("value").trim();
  var inputCity = inputField2.property("value").toLowerCase().trim();
  var inputState = inputField3.property("value").toLowerCase().trim();
  var inputCountry = inputField4.property("value").toLowerCase().trim();
  var inputShape = inputField5.property("value").toLowerCase().trim();

  var filterDate = data.filter(data => data.datetime === inputDate);
  var filterCity = data.filter(data => data.city === inputCity);
  var filterState = data.filter(data => data.state === inputState);
  var filterCountry = data.filter(data => data.country === inputCountry);
  var filterShape = data.filter(data => data.shape === inputShape);
  var filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity && data.state === inputState && data.country === inputCountry && data.shape === inputShape);

  tbody.html("");

  let response = {
    filterData, filterCity, filterState, filterCountry, filterShape, filterDate
  }

  if (response.filterData.length !== 0) {
    populate(filterData);
  }
    else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0 || response.filterState.length !== 0 || response.filterCountry.length !== 0 || response.filterShape.length !== 0))){
      populate(filterCity) || populate(filterDate) || populate(filterState) || populate(filterCountry) || populate(filterShape);
  
    }
    else {
      tbody.append("tr").append("td").text("No results found!"); 
    }
})

resetbtn.on("click", () => {
  tbody.html("");
  populate(data)
})
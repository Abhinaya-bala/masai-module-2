var baseUrl = "https://api.covid19api.com/"; //base url
var countries = [];
var global = {};

function sendRequest(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseUrl + path);

    xhr.send();

    xhr.onload = function () {
        if (xhr.status == 200) {
            callback(JSON.parse(xhr.response)); // input string to json
        } else {
            console.log("Error Code is:" + xhr.status);
        }
    };
}

function getSummary() {
    var path = "summary"; // /summary in path
    sendRequest(path, function (response) {
        // console.log(response); // api response
        var global = response.Global
        //console.log(global)

        var globalNewConfirmed = document.querySelector("#globalNewConfirmed")
        var globalConfirmed = document.querySelector("#globalConfirmed")
        var globalNewRecovered = document.querySelector("#globalNewRecovered")
        var globalRecovered = document.querySelector("#globalRecovered")
        var globalNewDeceased = document.querySelector("#globalNewDeceased")
        var globalDeceased = document.querySelector("#globalDeceased")

        globalNewConfirmed.innerHTML = "[ +" + global.NewConfirmed + " ]"
        globalNewRecovered.innerHTML = "[ +" + global.NewRecovered + " ]"
        globalNewDeceased.innerHTML = "[ +" + global.NewDeaths + " ]"

        globalConfirmed.innerHTML = global.TotalConfirmed
        globalRecovered.innerHTML = global.TotalRecovered
        globalDeceased.innerHTML = global.TotalDeaths


        countries = response.Countries
        console.log(countries)

        var countryList = document.querySelector("#countryList")

        // var sortvalue = document.querySelector('#sort').value



        countries.sort(function (a, b) {
            return b.TotalConfirmed - a.TotalConfirmed
        })
        printCountries()

    });
}
function printCountries() {
    var countryList = document.querySelector("#countryList")
    countryList.innerHTML = ""
    for (var i = 0; i < countries.length; i++) {
        var country = countries[i]
        var tableRow = document.createElement("tr")
        tableRow.setAttribute("id", country.Slug) //  for each country live data
        tableRow.innerHTML = "<td>" + country.Country + "</td>" + "<td>" + country.TotalConfirmed + "</td>" + "<td>" + country.TotalRecovered + "</td>" + "<td>" + country.TotalDeaths + "</td>"
        tableRow.addEventListener('click', countryClicked)

        countryList.appendChild(tableRow)
    }
}
getSummary()

function countryClicked(event) {
    console.log("test", event.target.parentElement.id) // to fetch  country slug name 
    // https://api.covid19api.com/country/south-africa/status/confirmed/live

    var path = "country/" + event.target.parentElement.id + "/status/confirmed/live"

    sendRequest(path, function (response) {
        console.log(response)
        var cases = response

        var livelist = document.querySelector("#liveList")
        livelist.innerHTML = " "
        for (var i = 0; i < cases.length; i++) {
            var noOfCase = cases[i]
            var tableRow = document.createElement("tr")
            tableRow.innerHTML = "<td>" + noOfCase.Country + "</td>" + "<td>" + noOfCase.Date + "</td>" + "<td>" + noOfCase.Cases + "</td>"
            livelist.appendChild(tableRow)
        }
    })
}

function sortByCondition(key, condition) {
    countries.sort(function (a, b) {
        if (condition == "dsc") {

            if (b[key] > a[key]) {
                return 1;// return b > a swap
            }
            else if (a[key] > b[key]) {
                return -1 // retain same position
            }
            return 0
        }

        else {
            if (a[key] > b[key]) {
                return 1;// return b > a swap
            }
            else if (b[key] > a[key]) {
                return -1 // retain same position
            }
            return 0
        }
    })
    printCountries()

}
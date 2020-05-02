import Customer from "./scripts/customer.js"
import Vehicle from "./scripts/vehicle.js"
import Invoice from "./scripts/invoice.js"

let vehicles = [] //for storing list of vehicles

$("#createVehicleLaunch").click(function () {
    $("#createVehicleModal").modal("show") // to show modal
})

$("#createVehiclebtn").click(function () {
    let vehicleType = $("#vehicleType").val()
    let vehicleNumber = $("#vehicleNumber").val()
    let vehicleModel = $("#vehicleModel").val()
    let currentLocatio = $("#currentLocation").val()
    let vehicleStatus = $("#vehicleStatus").val()


    let vehicle = new Vehicle(vehicleType, vehicleNumber, vehicleModel, currentLocatio, vehicleStatus) // creating new obj with exported constructor

    vehicles.push(vehicle)
    printVehicle() // to print 
    updateLocalStorage() // update local storage
    $("#createVehicleModal").modal("hide") // to hide modal after print


})

function printVehicle() {
    vehicles.forEach(vehicle => {
        $("#vehicleList").append(`<tr><td>${vehicle.type}</td><td>${vehicle.number}</td><td>${vehicle.model}</td><td>${vehicle.location}</td><td>${vehicle.status}</td></tr>`)
    });

}

function updateLocalStorage() {
    localStorage.setItem("vehicles", JSON.stringify(vehicles)) // vehicles array into local storage
}

function init() {
    let temp = localStorage.getItem("vehicles") // print the already present content in local storage
    if (temp) {
        vehicles = JSON.parse(temp)
        printVehicle()
    }
}

init()
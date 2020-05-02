import Customer from "./scripts/customer.js"
import Vehicle from "./scripts/vehicle.js"
import Invoice from "./scripts/invoice.js"

let customers = []


$("#showVehicle").click(function () {
    let location = $("#selectLocation").val()
    printVehicle(location)
})
function printVehicle(location) {

    let resultVehicle = vehicles.filter(vehicle => {
        if (vehicle.location == location && vehicle.status == "parked") {
            return true;
        }
        else {
            return false;
        }
    })

    resultVehicle.forEach(vehicle => {
        $("#vehicleList").append(`<tr><td>${vehicle.type}</td><td>${vehicle.number}</td><td>${vehicle.model}</td><td><button class="btn btn-primary bookbtn">book</button></td></tr>`)
    });

}



function init() {
    let temp = localStorage.getItem("vehicles") // print the already present content in local storage
    if (temp) {
        vehicles = JSON.parse(temp)

    }
}

init()

$(document).on('click', '.bookbtn', function () {
    console.log("book modal")

    $("#createCustomerModal").modal("show")

    let name = $("#name").val()
    let email = $("#email").val()
    let phoneNo = $("#phoneNo").val()



    let customer = new Customer(name, email, phoneNo) // creating new obj with exported constructor

    customers.push(customer)
    printCustomer() // to print 
    updateLocalStorage() // update local storage
    $("#createCustomerModal").modal("hide") // to hide modal after print

});



function printCustomer() {
    vehicles.forEach(vehicle => {
        $("#vehicleList").append(`<tr><td>${vehicle.type}</td><td>${vehicle.number}</td><td>${vehicle.model}</td><td>${vehicle.location}</td><td>${vehicle.status}</td></tr>`)
    });

}

function updateLocalStorage() {
    localStorage.setItem("vehicles", JSON.stringify(vehicles)) // vehicles array into local storage
}


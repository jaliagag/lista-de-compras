// inputs

const productName = document.getElementById("productName");
const productLink = document.getElementById("productLink");
const amount = document.getElementById("amount");
const leDisplay = document.getElementById("le-display");

// buttons
const addItems = document.getElementById("add-items");
const createFile = document.getElementById("create-file");

// functions

function faddItems() {
    if (productName.value === '') {
        alert("escibi el nombre del producto");
    }
    else if (productLink.value === '') {
        alert("escibi el link del producto");
    } else {
        leDisplay.innerHTML += `<li class="list-group-item">${productName.value} | <a href="${productLink.value}" target="_blank">link</a> | ${amount.value}</li>`
    }
}
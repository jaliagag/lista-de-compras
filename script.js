// inputs

const productName = document.getElementById("productName");
const productLink = document.getElementById("productLink");
const amount = document.getElementById("amount");
const leDisplay = document.getElementById("le-display");
let finalAmount = "1";

let info = [];

// buttons
// const addItems = document.getElementById("add-items");
// const createFile = document.getElementById("create-file");

// functions

function faddItems() {
    if (amount.value != '') {
        finalAmount = amount.value;
    }
    if (productName.value === '') {
        alert("escibi el nombre del producto");
    }
    else if (productLink.value === '') {
        alert("escibi el link del producto");
    } else {
        info.push([ { "name": productName.value, "link": productLink.value, "cantidad": finalAmount])
        leDisplay.innerHTML += `<li class="list-group-item">${productName.value} | <a href="${productLink.value}" target="_blank">link</a> | ${finalAmount} <span>❌</span> </li>`;
        productLink.value = "";
        productName.value = "";
        amount.value = "";
        finalAmount = "1";
    }
    console.log(info)
}

function fcreateFile() {
    // alert("me clickeaste!");
    // let csvContent = "data:text/csv;charset=utf-8,";

    // info.forEach(function(rowArray) {
    //     let row = rowArray.join(",");
    //     csvContent += row + "\r\n";
    // });
    let csvContent = "data:text/csv;charset=utf-8," 
    + info.map(e => e.join(",")).join("\n");

    console.log(csvContent)
}
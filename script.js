// inputs

const productName = document.getElementById("productName");
const productLink = document.getElementById("productLink");
const amount = document.getElementById("amount");
const price = document.getElementById("price");
const leDisplay = document.getElementById("le-display");
const total = document.getElementById("total");
let finalAmount = "1";

let info = [];
let finalPrice = 0;

// buttons
const addItem = document.getElementById("add-items");
const createFile = document.getElementById("create-file");

// functions

function checkIfExist(umaLista, umStr) {
    // console.log('uno ',umaLista);
    for (let i = 0; i < umaLista.length; i++) {
        // console.log('dos ', umaLista[i]['name'], ' ', umStr);
        if (umaLista[i]['name'] == umStr) {
            return false;
        }
    }
    return true;
}

function faddItems() {
    if (checkIfExist(info, productName.value)) {
        if (amount.value != '') {
            finalAmount = amount.value;
        }
        if (productName.value === '') {
            alert("escibí el NOMBRE del producto - no puede estar vacío");
        }
        else if (productLink.value === '') {
            alert("escibí el LINK del producto");
        } else if (price.value === '') {
            alert("escibí el PRECIO del producto");
        } else {
            info.push( { name: productName.value, link: productLink.value, cantidad: finalAmount, price: price.value });
            leDisplay.innerHTML += `<li class="list-group-item d-flex justify-content-between"> <div class="ms-2 me-auto">${productName.value} | <a href="${productLink.value}" target="_blank">link</a> | ${finalAmount} | ${Number(price.value) * Number(finalAmount)}</div> <span>❌</span> </li>`;
            finalPrice += Number(price.value) * Number(finalAmount);

            productLink.value = "";
            productName.value = "";
            amount.value = "";
            price.value = "";
            finalAmount = "1";
        }

        // console.log(info);
        total.value = finalPrice;
    } else {
        alert('Ese nombre ya está usado! los nombres deben ser ÚNICOS');
    }

}

// Function to download the CSV file
const download = (data) => {
    // Create a Blob with the CSV data and type
    const blob = new Blob([data], { type: 'text/csv' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create an anchor tag for downloading
    const a = document.createElement('a');
    
    // Set the URL and download attribute of the anchor tag
    a.href = url;
    a.download = 'productos.csv';
    
    // Trigger the download by clicking the anchor tag
    a.click();
}

function fcreateFile() {
    const csvString = [
        [
            "nombre",
            "cantidad",
            "precio",
            "link"
        ],
        ...info.map(item => [
            item.name,
            item.cantidad,
            item.cantidad,
            item.link
        ])
    ]
     .map(e => e.join(","))
     .join("\n")

    // console.log(csvString);
    download(csvString);
}

leDisplay.addEventListener('click', function(e){

    if(e.target.tagName === 'SPAN') {
        let lePrice = e.target.parentNode.innerText.split("\n")[0].split(" ");
        // console.log(`voy a restar ${finalPrice} - ${lePrice[lePrice.length - 1]}`)
        let newPrice = finalPrice - Number(lePrice[lePrice.length -1]);

        let leText = e.target.parentNode.innerText.split(" ")[0];
        // console.log(info[leText]);

        for (let i = 0; i < info.length; i++) {
            if (info[i]['name'] == leText) {
                // console.log(`el item ${leText} esta en la posicion ${i}`)
                info.splice(i,1);
            }
        }
        // console.log(info);

        finalPrice = newPrice;
        total.value = newPrice;

        e.target.parentElement.remove();
    }
})

// no spaces in nombre input
function trimInput(inputElement) {
    inputElement.value = inputElement.value.trim();
}

productName.addEventListener('input', () => {
    trimInput(productName);
});
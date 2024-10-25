// inputs

const productName = document.getElementById("productName");
const productLink = document.getElementById("productLink");
const amount = document.getElementById("amount");
const leDisplay = document.getElementById("le-display");
let finalAmount = "1";

let info = [];

// buttons
const addItem = document.getElementById("add-items");
const createFile = document.getElementById("create-file");

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
        info.push( { name: productName.value, link: productLink.value, cantidad: finalAmount});
        leDisplay.innerHTML += `<li class="list-group-item d-flex justify-content-between"> <div class="ms-2 me-auto">${productName.value} | <a href="${productLink.value}" target="_blank">link</a> | ${finalAmount}</div> <span>❌</span> </li>`;
        productLink.value = "";
        productName.value = "";
        amount.value = "";
        finalAmount = "1";
    }
    console.log(info)
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
            "link"
        ],
        ...info.map(item => [
            item.name,
            item.cantidad,
            item.link
        ])
    ]
     .map(e => e.join(","))
     .join("\n")

    console.log(csvString);
    download(csvString);
}

leDisplay.addEventListener('click', function(e){

    if(e.target.tagName === 'SPAN') {
        let leText = e.target.parentNode.innerText.split(" ")[0];
        console.log(info[leText]);

        for (let i = 0; i < info.length; i++) {
            if (info[i]['name'] == leText) {
                console.log(`el item ${leText} esta en la posicion ${i}`)
                info.splice(i,1);
            }
        }
        console.log(info)

        e.target.parentElement.remove();

    }
})

function trimInput(inputElement) {
    inputElement.value = inputElement.value.trim();
}

productName.addEventListener('input', () => {
    trimInput(productName);
});
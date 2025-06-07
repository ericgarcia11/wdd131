const yearSpan = document.querySelector("footer span");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified: ${lastModified}`;

const submittButton = document.getElementById("submit");
const currentFile = window.location.pathname.split("/").pop();
const pageTitle = document.querySelector("header h1");
let main = document.querySelector("main");

let reviewCount = getReviewCount() || 0;

console.log(reviewCount);

function setReviewCount(){
    localStorage.setItem(`reviewCount`, JSON.stringify(reviewCount));
}

function getReviewCount(){
    return JSON.parse(localStorage.getItem(`reviewCount`));
}

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

const selectProductNames = document.getElementById("product_name");

if (currentFile == "form.html"){
    products.forEach(product =>{
        let option = document.createElement('option');
        option.setAttribute("value",product.id);
        option.textContent = product.name;
        selectProductNames.appendChild(option);
    })

    submittButton.addEventListener('click', function(){
        reviewCount += 1;
        setReviewCount()
    })
} else {
    main.style.height = "70vh";
    main.style.display = "flex";
    main.style.flexDirection = "column";
    main.style.alignItems = "center";
    main.style.justifyContent = "center";
    main.style.gap = "3rem";

    document.querySelector("button").addEventListener('click', function(){
        window.location.href = "form.html";
    })
}

pageTitle.addEventListener('click', function(){
    window.location.href = "form.html";
})



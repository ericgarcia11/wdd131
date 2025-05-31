const yearSpan = document.querySelector("footer span");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified: ${lastModified}`;

// const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const navLinks = document.querySelectorAll('#navigation a');
const imgBlurs = document.querySelectorAll('.img-blur');
const page_title = document.getElementById('page_title');
const headerTitle = document.querySelector('h1');
const hamburgerButton = document.getElementById('hamburgerButton');
const main = document.querySelector('main');

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Porto Alegre Brazil",
    location: "Porto Alegre, Brazil",
    dedicated: "2000, December, 17",
    area: 13325,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/porto-alegre-brazil-temple/porto-alegre-brazil-temple-14267-main.jpg"
  },
  {
    templeName: "Natal Brazil",
    location: "Natal, Brazil",
    dedicated: "N/A",
    area: 19800,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/natal-brazil-temple/natal-brazil-temple-45005-main.jpg"
  },
  {
    templeName: "Curitiba Brazil",
    location: "Curitiba, Brazil",
    dedicated: "2008, June, 1",
    area: 27850,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/curitiba-brazil-temple/curitiba-brazil-temple-1078-main.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, November, 2",
    area: 59246,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii",
    dedicated: "1919, November, 30",
    area: 42100,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/laie-hawaii-temple/laie-hawaii-temple-7370-main.jpg"
  },
];

let currentPage = "home";

function createFigureTemple(temple){
    const figure = document.createElement("figure");
    figure.classList.add("image-hover")
    // creating the img element
    const imgBlur = document.createElement("img");
    const imgClear = document.createElement("img");
    imgClear.src = "images/easter-egg.jpg";
    imgClear.classList.add("img-clear");
    imgBlur.src = temple.imageUrl;
    imgBlur.alt = temple.templeName;
    imgBlur.classList.add("img-blur");

    imgBlur.loading = "lazy";
    imgClear.loading = "lazy";
    // creating the figcaption element
    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("temple_name");
    figcaption.textContent = temple.templeName;
    // creating the three needed div's
    const divLocation = document.createElement("div");
    divLocation.innerHTML = `<strong>Location:</strong> <span>${temple.location}</span>`

    const divDedicated = document.createElement("div");
    divDedicated.innerHTML = `<strong>Dedicated:</strong> <span>${temple.dedicated}</span>`

    const divSize = document.createElement("div");
    divSize.innerHTML = `<strong>Size:</strong> <span>${temple.area}</span>`

    // appending the elements to the figure element
    figure.appendChild(imgBlur);
    figure.appendChild(imgClear);
    figure.appendChild(figcaption);
    figure.appendChild(divLocation);
    figure.appendChild(divDedicated);
    figure.appendChild(divSize);

    // appending the figure element to the main element (adding the temple in the page)
    main.appendChild(figure);
}

function renderTemples(currentPage){
    temples.forEach(temple =>{

        const year = parseInt(temple.dedicated.split(",")[0]);
        const area = temple.area;
        console.log(`currentPage: ${currentPage}`);
        console.log(`year: ${year}`);
        console.log(`area: ${area}`);

        if (currentPage == "home") {
            console.log(`e`);
            createFigureTemple(temple);
        }
        if (currentPage == "old" && year < 1900){
            console.log(`a`);
            createFigureTemple(temple);
        }
        if (currentPage == "new" && year > 2000){
            console.log(`b`);
            createFigureTemple(temple);
        }
        if (currentPage == "large" && area > 90000 ){
            console.log(`c`);
            createFigureTemple(temple);
        }
        if (currentPage == "small" && area < 10000){
            console.log(`d`);
            createFigureTemple(temple);
        }
    })
}

renderTemples(currentPage);

navLinks.forEach(link =>{
	link.addEventListener('click', function(){
		navLinks.forEach(link => link.classList.remove('active'));
        
        if (link.textContent == 'Old'){
            currentPage = "old";
        } else if (link.textContent == 'New'){
            currentPage = "new";
        } else if (link.textContent == 'Large'){
            currentPage = "large";
        } else if (link.textContent == 'Small'){
            currentPage = "small";
        } else if (link.textContent == 'Home'){
            currentPage = "home";
        }

		this.classList.add('active');
        page_title.innerHTML = link.textContent;
        const figures = main.querySelectorAll('figure');
        figures.forEach(figure => figure.remove());
        renderTemples(currentPage);
	});
});

headerTitle.addEventListener('click', function(){
    let newImage = 'images/temple_porto_alegre_br.png';
    imgBlurs.forEach(img => img.setAttribute('src', newImage));
    navLinks.forEach(link => link.classList.remove('active'));
    
    navLinks[0].setAttribute('class','active');
    page_title.innerHTML = 'Home';
})

hamburgerButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamburgerButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
    if (navigation.classList.contains("open")){
        document.querySelector('header').removeChild(hamburgerButton);
        navigation.insertBefore(hamburgerButton, navigation.firstChild);
    } else {
        document.querySelector('header').appendChild(hamburgerButton);
    }
});

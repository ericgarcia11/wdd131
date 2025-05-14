const yearSpan = document.querySelector("footer span");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified: ${lastModified}`;

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll('.navigation a');
const imgBlurs = document.querySelectorAll('.img-blur');
const page_title = document.getElementById('page_title');
const headerTitle = document.querySelector('h1');

// hamButton.addEventListener("_______", () => {
// 	navigation.classList.toggle("open");
// 	hamButton.classList.toggle("open");
// });

navLinks.forEach(link =>{
	link.addEventListener('click', function(){
		navLinks.forEach(link => link.classList.remove('active'));
        
        let newImage = '';
        if (link.textContent == 'Old'){
            newImage = 'images/temple_porto_alegre_old.png';
        } else if (link.textContent == 'New'){
            newImage = 'images/temple_porto_alegre_new.png';
        } else if (link.textContent == 'Large'){
            newImage = 'images/temple_porto_alegre_large.png';
        } else if (link.textContent == 'Small'){
            newImage = 'images/temple_porto_alegre_small.png';
        } else {
            newImage = 'images/temple_porto_alegre_br.png';
        }

        imgBlurs.forEach(img => img.setAttribute('src', newImage));

		this.classList.add('active');

        page_title.innerHTML = link.textContent;
	});
});

headerTitle.addEventListener('click', function(){
    let newImage = 'images/temple_porto_alegre_br.png';
    imgBlurs.forEach(img => img.setAttribute('src', newImage));
    navLinks.forEach(link => link.classList.remove('active'));
    
    navLinks[0].setAttribute('class','active');
    page_title.innerHTML = 'Home';
})

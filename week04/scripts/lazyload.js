const yearSpan = document.querySelector("footer span");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified: ${lastModified}`;

const images = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }else {
            entry.target.classList.remove('visible'); // Some
        }
      });
    }, { threshold: 0.1 });

    images.forEach(img => {
      observer.observe(img);
    });
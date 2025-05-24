const yearSpan = document.querySelector("footer span");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified: ${lastModified}`;

const temperature = parseFloat(document.getElementById("temperature").textContent);
const windSpeed = parseFloat(document.getElementById("windspeed").textContent);
const windChill = document.getElementById("windchill");
let windChillContent = "";

console.log(temperature);
console.log(windSpeed);

function calculateWindChill(temperature, windSpeed){
    return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1) + " °C";        
}

if (temperature <= 10 && windSpeed > 4.8){    
        windChillContent = calculateWindChill(temperature, windSpeed)
} else {
    windChillContent =  "N/A"
}

windChill.textContent = windChillContent;
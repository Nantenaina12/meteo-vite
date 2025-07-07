import './style.css'
import { DateTime } from 'luxon';
const bouton = document.getElementById("chercher");
const resultat = document.getElementById("resultat");

bouton.addEventListener("click", () => {
  const ville = document.getElementById("ville").value.trim();
  if (ville === "") return;

  const cle = "3c271bbb23f824063a783ea95c8f9983"; //clé OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${cle}&units=metric&lang=fr`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Ville non trouvée");
      console.log(response);
      return response.json();
    })
    .then(data => {
      const nom = data.name;
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const timezone = data.timezone;
      const pression=data.main.pressure;
      const humidite=data.main.humidity;
      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const timezoneUrl = `https://api.bigdatacloud.net/data/timezone-by-location?latitude=${lat}&longitude=${lon}&key=bdc_fdf440bfbdd84eb2b1bd7d03a5c912b0`;

      fetch(timezoneUrl)
        .then(res => res.json())
        .then(timezoneData => {
          const zone = timezoneData.ianaTimeId;
          const heureLocale = DateTime.now().setZone(zone).toFormat("HH:mm");

       resultat.innerHTML = `
      <h2>${nom}</h2>
      <p>🌡️ Température : ${temp} °C</p>
      <p>💧 Humidité : ${humidite}%</p>
      <p>Pression : ${pression} hPa</p>
      <p>☁️ ${desc}</p>
      <img src="${iconURL}" alt="météo">
    <p>🕒 Heure locale : ${heureLocale}</p>
  `;

    // 🔁 Réinitialiser l’animation à chaque fois
      resultat.style.animation = 'none';
      void resultat.offsetWidth; // force reflow
      resultat.style.animation = 'fadeIn 0.8s ease forwards';
    })
    .catch(error => {
      resultat.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
  })});
});

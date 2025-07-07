import './style.css'
const bouton = document.getElementById("chercher");
const resultat = document.getElementById("resultat");

bouton.addEventListener("click", () => {
  const ville = document.getElementById("ville").value.trim();
  if (ville === "") return;

  const cle = "3c271bbb23f824063a783ea95c8f9983"; // Remplace par ta vraie clé OpenWeatherMap
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
      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      resultat.innerHTML = `
        <h2>${nom}</h2>
        <p>🌡️ Température : ${temp} °C</p>
        <p>🌥️ ${desc}</p>
        <img src="${iconURL}"alt="météo">
      `;
    })
    .catch(error => {
      resultat.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
    });
});

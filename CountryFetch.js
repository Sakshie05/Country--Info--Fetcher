let search = document.querySelector("#search-btn");
let random = document.querySelector("#random-btn");
let inp = document.querySelector("#country-input");
let res = document.querySelector("#result");

search.addEventListener("click", async () => {
    let country = inp.value;
    let response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    let data = await response.json();

    let countryData = data[0];let html = `
  <img src="${countryData.flags.png}" alt="Flag of ${countryData.name.common}">
  <p><strong>Capital:</strong> ${countryData.capital[0]}</p>
  <p><strong>Continent:</strong> ${countryData.continents[0]}</p>
  <p><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
  <p><strong>Borders:</strong> ${countryData.borders ? countryData.borders.join(', ') : 'None'}</p>
`;
res.innerHTML = html;
})

random.addEventListener("click", async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,continents,population,borders");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const countryData = data[Math.floor(Math.random() * data.length)];

    const html = `
      <img src="${countryData.flags.png}" alt="Flag of ${countryData.name.common}">
      <p><strong>Capital:</strong> ${countryData.capital ? countryData.capital[0] : "N/A"}</p>
      <p><strong>Continent:</strong> ${countryData.continents[0]}</p>
      <p><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
      <p><strong>Borders:</strong> ${countryData.borders ? countryData.borders.join(', ') : "None"}</p>
    `;

    res.innerHTML = html;
  } catch (err) {
    res.innerHTML = `<p>Oops! Couldn't fetch a random country.</p>`;
    console.error("Random fetch error:", err);
  }
});

// загрузка данных из api
const loadCountries = (url = "https://restcountries.com/v3.1/all") => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCountries(data));
};

// отображение данных
const displayCountries = (countries) => {
  const countriesHTML = countries.map((country) => getCountry(country));
  const container = document.getElementById("countries");
  container.innerHTML = countriesHTML.join(" ");
};

// получение данных в виде html блока
const getCountry = (country) => {
  // console.log(country);
  return `
          <div class="country-div">
            <div class="gradient"></div>
            <div class="flag">
              <a target="_blank" href="${country.maps.googleMaps}">
                <div class="flag">
                  <img src="${country.flags.png}" />
                </div>
              </a>
              <div class="text">
                <h2>${country.name.official}</h2>
                <h3>${country.capital}</h3>
              </div>
            </div>
          </div>
        `;
};

// проверка выделенного пункта меню
const checkSelectedFilter = () => {
  const previousClicked = document.querySelector(".leftMenu ul li a.clicked");
  if (previousClicked) {
    previousClicked.classList.remove("clicked"); // если есть, то удаляем
  } else {
    // если нет, то выделяем «All»
    const filters = document.querySelectorAll(".filter");
    filters.forEach((filter) => {
      if (filter.id === "all") {
        loadCountries();
        filter.classList.add("clicked");
      }
    });
  }
};

// фильтрация по языку через левое меню
const clickFilter = () => {
  const filters = document.querySelectorAll(".filter");
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      checkSelectedFilter();
      if (filter.id === "all") {
        loadCountries();
        filter.classList.add("clicked");
      } else {
        loadCountries(`https://restcountries.com/v3.1/lang/${filter.id}`);
        filter.classList.add("clicked");
      }
    });
  });
};

checkSelectedFilter();
clickFilter();
loadCountries();

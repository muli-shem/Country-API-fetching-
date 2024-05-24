document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.getElementById('cards');
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const countryDetail = document.getElementById('country-detail');
    const backButton = document.getElementById('back-button');

    let countriesData = [];

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            countriesData = data;
            displayCountries(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    const displayCountries = (countries) => {
        cardsContainer.innerHTML = '';
        countries.forEach(country => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                <h2>${country.name}</h2>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            `;
            card.addEventListener('click', () => displayCountryDetail(country));
            cardsContainer.appendChild(card);
        });
    };

    const displayCountryDetail = (country) => {
        cardsContainer.classList.add('hidden');
        countryDetail.classList.add('active');

        document.getElementById('country-flag').src = country.flags.svg;
        document.getElementById('country-name').innerText = country.name.common;
        document.getElementById('native-name').innerText = country.name.nativeName
            ? Object.values(country.name.nativeName)[0].common
            : country.name.common;
        document.getElementById('population').innerText = country.population.toLocaleString();
        document.getElementById('region').innerText = country.region;
        document.getElementById('sub-region').innerText = country.subregion;
        document.getElementById('capital').innerText = country.capital ? country.capital[0] : 'N/A';
        document.getElementById('top-level-domain').innerText = country.tld ? country.tld[0] : 'N/A';
        document.getElementById('currencies').innerText = country.currencies
            ? Object.values(country.currencies).map(currency => currency.name).join(', ')
            : 'N/A';
        document.getElementById('languages').innerText = country.languages
            ? Object.values(country.languages).join(', ')
            : 'N/A';
        document.getElementById('border-countries').innerText = country.borders
            ? country.borders.join(', ')
            : 'N/A';
    };

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCountries = countriesData.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm)
        );
        displayCountries(filteredCountries);
    });

    regionFilter.addEventListener('change', () => {
        const region = regionFilter.value;
        const filteredCountries = region ?
            countriesData.filter(country => country.region === region) :
            countriesData;
        displayCountries(filteredCountries);
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    backButton.addEventListener('click', () => {
        countryDetail.classList.remove('active');
        cardsContainer.classList.remove('hidden');
    });
});

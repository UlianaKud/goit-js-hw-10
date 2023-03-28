import './css/styles.css';
import './css/styles-js.css';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

import { fetchCountries } from './fetchCountries';

const input = document.querySelector('input');
const countryList = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

let handleSearchName = () => {
  let inputName = input.value;
  console.log(inputName.trim());
  if (inputName.trim() === '') {
    return;
  }
  if (inputName) {
    const countryName = inputName.trim();
    fetchCountries(countryName)
      .then(names => {
        if (names.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (names.length >= 2 && names.length <= 10) {
          renderNamesList(names);
        } else if (names.length === 1) {
          renderName(names);
        }
      })
      .catch(err => {
        countryList.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  } else {
    countryList.innerHTML = '';
  }
};

input.addEventListener('input', debounce(handleSearchName, DEBOUNCE_DELAY));

function renderName(names) {
  const markup = names
    .map(name => {
      console.log(names);
      const languages = Object.values(name.languages);
      return `<li class='country-container'>
                <div class='name-container'>
                  <div class="img-container">
                    <img src="${name.flags.svg}">
                 </div>    
                    <p class='name-text'>${name.name.official}</p>
                </div>
                <div class='params-container'>
                  <p><b>Capital</b>: ${name.capital}</p>
                  <p><b>Population</b>: ${name.population}</p>
                  <p><b>Languages</b>: ${languages.join(', ')}</p>
                </div>        
          </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderNamesList(names) {
  const markup = names
    .map(name => {
      console.log(name);
      return `<li class='countries-container'>
                <div class="img-container">
                    <img src="${name.flags.svg}">
                </div>    
                <p>${name.name.official}</p>
            </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}


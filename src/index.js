import './sass/main.scss';
import galleryList from './templates/galleryList.hbs';
import cardImage from './templates/cardImage.hbs';
import apiService from './js/apiService';
import object from './js/object.js';

const searchImageInput = document.querySelector('#search-form__input')
// const searchImageButton = document.querySelector('#search-form__button')
const container = document.querySelector('.container')

searchImageInput.addEventListener('change', onSearchImage)

function onSearchImage(event) {
  return apiService(event)
    .then(data => {
      const arr = data.hits[0]
      console.log(arr)
      return container.insertAdjacentHTML('beforeend', cardImage(arr))
    })
}
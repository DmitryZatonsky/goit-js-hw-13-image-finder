import './sass/main.scss';
import cardImageTpl from './templates/cardImage.hbs';
import apiService from './js/apiService';
import object from './js/object.js';

const refs = {
  imageSearchForm: document.querySelector('#search-form'),
  imageSearchInput: document.querySelector('#search-form__input'),
  imageSearchBtn: document.querySelector('#search-form__button'),
  // pictureListContainer: document.querySelector('.container'),
  pictureListContainer: document.querySelector('.gallery'),
}

refs.imageSearchForm.addEventListener('submit', onSearchImage)

function onSearchImage(event) {
  event.preventDefault();

  apiService(event)
    .then(hits => {
      return refs.pictureListContainer.insertAdjacentHTML('beforeend', cardImageTpl(hits))
    })
}

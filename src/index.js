import './sass/main.scss';
import cardImageTpl from './templates/cardImage.hbs';
import ApiService from './js/apiService';
import { error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  imageSearchForm: document.querySelector('#search-form'),
  pictureListContainer: document.querySelector('.gallery'),
}
const apiService = new ApiService();
const myStack = new Stack({
  dir1: 'up',
});

refs.imageSearchForm.addEventListener('submit', onSearchImage)
// document.addEventListener('scroll', onLoadMore)

function onSearchImage(event) {
  event.preventDefault();
  resetMarkup();
  apiService.query = event.target.elements.query.value;
  apiService.fetchImages()
    .then(hits => {
      return refs.pictureListContainer.insertAdjacentHTML('beforeend', cardImageTpl(hits))
    })
    .catch(onError)
}

function resetMarkup() {
  refs.pictureListContainer.innerHTML = '';
  apiService.resetPageNumber();
}

function onLoadMore() {
  apiService.fetchImages();
  // onScroll();
}

// function onScroll() {
//   let lastGalleryItem = document.querySelectorAll('.gallery__item');
//   console.log(apiService.perPage)
//   .scrollIntoView({
//     block: "end",
//     behavior: "smooth",
//   });
// }

function onError() {
  error({
    title: 'Error!!!',
    text: 'Давай по новой...',
    stack: myStack,
  })
}
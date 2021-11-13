import './sass/main.scss';
import cardImageTpl from './templates/cardImage.hbs';
import ApiService from './js/apiService';
import { error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  imageSearchForm: document.querySelector('#search-form'),
  pictureListContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
}
const apiService = new ApiService();
const myStack = new Stack({
  dir1: 'up',
});

refs.imageSearchForm.addEventListener('submit', onSearchImage)
refs.loadMoreBtn.addEventListener('click', onLoadMore)

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
  apiService.fetchImages()
    .then(hits => {
        return refs.pictureListContainer.insertAdjacentHTML('beforeend', cardImageTpl(hits))
    })
    .catch(onError)
 onScroll();
}

function onScroll() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function onError() {
  error({
    title: 'Error!!!',
    text: 'Давай по новой...',
    stack: myStack,
  })
}
import './sass/main.scss';
import cardImageTpl from './templates/cardImage.hbs';
import ApiService from './js/apiService';

const refs = {
  imageSearchForm: document.querySelector('#search-form'),
  pictureListContainer: document.querySelector('.gallery'),
}

const apiService = new ApiService();

refs.imageSearchForm.addEventListener('submit', onSearchImage)

function onSearchImage(event) {
  event.preventDefault();
  apiService.query = event.target.elements.query.value;
  apiService.fetchImages()
    .then(hits => {
      return refs.pictureListContainer.insertAdjacentHTML('beforeend', cardImageTpl(hits))
    })
}

export default function fetchImages(evt) {

const BASE_URL = 'https://pixabay.com/api';
const MY_KEY = '24281022-8ffcad6d3ff85d8030a2c3f1e';

const searchQuery = evt.target.value;
const pageNumber = 1;
const perPage = 12;

const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=${perPage}&key=${MY_KEY}`;

  return fetch(url)
    .then(responce => responce.json())
} 
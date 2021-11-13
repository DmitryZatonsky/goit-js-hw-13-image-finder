const BASE_URL = 'https://pixabay.com/api';
const MY_KEY = '24281022-8ffcad6d3ff85d8030a2c3f1e';

export default class ApiService {

  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
    this.perPage = 12;
  }
  
  fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${this.perPage}&key=${MY_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.pageNumber += 1;
        return data.hits;
      })
  }

  resetPageNumber() {
    this.pageNumber = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}
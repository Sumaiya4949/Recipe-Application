import View from './view.js';
import icons from 'url:../../img/icons.svg';
class resultView extends View {
  _errorMessage = 'No recipes found for your query! Please try again!';
  _message = '';
  _parentElement = document.querySelector('.results');

  _generatMarkup() {
    return this._data.map(this._generatMarkupPreview).join('');
  }
  _generatMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }"  href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.imageUrl}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>`;
  }
}

export default new resultView();
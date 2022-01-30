import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class BookMarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'No bookmark found for! Please bookmark your favorite recipe!';
  _message = '';

  _generatMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookMarkView();

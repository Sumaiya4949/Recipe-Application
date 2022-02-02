import View from './view.js';
import icons from 'url:../../img/icons.svg';
class addNewRecipe extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleRecipeView() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this.btnOpen.addEventListener('click', this.toggleRecipeView.bind(this));
  }

  _addHandlerHideWindow() {
    this.btnClose.addEventListener('click', this.toggleRecipeView.bind(this));
    this._overlay.addEventListener('click', this.toggleRecipeView.bind(this));
  }

  _addHandlerUpload() {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }
  _generatMarkup() {}
}

export default new addNewRecipe();

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import bookmarkView from './view/bookmarkView.js';
import addRecipeView from './view/addRecipeView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//if (module.hot) {
// module.hot.accept();
//}
const controlRecipes = async function () {
  try {
    //render Spinner
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //0 Update result with marked selected view
    resultView.update(model.getSearchResultPage());
    bookmarkView.update(model.state.bookmarks);

    //1 loading recipe
    await model.loadRecipe(id);

    //2 rendering recipe
    recipeView.render(model.state.recipe);
    //  'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcfcc'
    //  'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
  } catch (err) {
    recipeView.renderError();
  }
  //controlServings();
};

const controlLoadSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    //Load Result
    await model.loadSearchResult(query);
    if (!query) return;

    //Render search_result

    resultView.render(model.getSearchResultPage());

    //render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  //Update servings
  model.updateServings(newServing);
  //Update the view page
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    //Add bookmark
    model.addBookmark(model.state.recipe);
  } else {
    //Remove bookmark
    model.removeBookmark(model.state.recipe.id);
  }
  //render bookmark_List
  bookmarkView.render(model.state.bookmarks);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newrecipe) {
  try {
    //Render Spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newrecipe);

    //render newly uploaded recipe
    recipeView.render(model.state.recipe);

    //Render success message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    //chnage id

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close form window
    setTimeout(function () {
      addRecipeView.toggleRecipeView();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlLoadSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlUploadRecipe);
};

init();

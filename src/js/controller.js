import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';

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
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  console.log(model.state.recipe);

  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlLoadSearchResult);
  paginationView.addHandlerClick(controlPagination);
};

init();

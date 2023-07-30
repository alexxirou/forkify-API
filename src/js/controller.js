// Import 'async' from 'regenerator-runtime' to enable asynchronous functionality with async/await.
import { async } from 'regenerator-runtime';

// Import modules for the models and views of the application.
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import bookmarksView from './views/bookmarks.View.js';
import addRecipeView from './views/addRecipeView.js';
import paginationView from './views/paginationView.js';

// Import constant for modal close duration from 'config.js'.
import { MODAL_CLOSE_SEC } from './config.js';

// Select the recipe container element from the DOM.
const recipeContainer = document.querySelector('.recipe');

// Controller function to handle the rendering of a recipe.
const controlRecipe = async function () {
  try {
    // Extract the new hash value (remove the '#' symbol) from the URL.
    const newHash = window.location.hash.slice(1);
    if (!newHash) return;

    // Render the loading spinner on the recipe view.
    recipeView.renderSpinner();

    // Update the search results view and bookmarks view.
    searchResultsView.update(model.getSearchResultsPage());
    bookmarksView.render(model.state.bookmark);

    // Load the recipe data based on the hash value.
    await model.loadRecipe(newHash);

    // Render the recipe view with the loaded recipe data.
    recipeView.render(model.state.recipe);
  } catch (err) {
    // Render an error message on the recipe view in case of any error.
    recipeView.renderError();
    console.error(err);
  }
};

// Controller function to handle search results.
const controlSearchResults = async function () {
  try {
    // Render the loading spinner on the search results view.
    searchResultsView.renderSpinner();

    // Get the search query from the search view.
    const query = searchView.getQuery();

    // If the query is empty, return.
    if (!query) return;

    // Load the search results based on the query.
    await model.loadSearchResults(query);

    // Render the search results view and pagination view.
    searchResultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

// Controller function to handle pagination.
const controlPagination = function (goToPage) {
  // Render the search results for the specified page.
  searchResultsView.render(model.getSearchResultsPage(goToPage));

  // Render the pagination view.
  paginationView.render(model.state.search);
};

// Controller function to handle updating servings in the recipe.
const controlServings = function (newServings) {
  // Update the number of servings in the recipe model.
  model.updateServings(newServings);

  // Render the recipe view with updated servings.
  recipeView.render(model.state.recipe);
};

// Controller function to add or remove a bookmark for a recipe.
const controlAddBookmark = function () {
  // Toggle the bookmark status of the recipe in the model.
  !model.state.recipe.bookmarked ? model.addBookmark(model.state.recipe) : model.removeBookmark(model.state.recipe);

  // Render the recipe view with updated bookmark status.
  recipeView.render(model.state.recipe);

  // Render the bookmarks view with updated bookmarks.
  bookmarksView.render(model.state.bookmark);
};

// Controller function to load bookmarks.
const controlLoadBookmark = function () {
  // Render the bookmarks view with loaded bookmarks.
  bookmarksView.render(model.state.bookmark);
};

// Controller function to handle adding a new recipe.
const controlAddRecipe = async function (newRecipe) {
  try {
    // Render the loading spinner on the add recipe view.
    addRecipeView.renderSpinner();

    // Upload the new recipe to the server using the model.
    await model.uploadRecipe(newRecipe);

    // Render the recipe view with the uploaded recipe.
    recipeView.render(model.state.recipe);

    // Render a success message on the add recipe view.
    addRecipeView.renderMessage();

    // Render the bookmarks view with updated bookmarks.
    bookmarksView.render(model.state.bookmarks);

    // Update the URL hash to include the ID of the uploaded recipe.
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close the add recipe modal after a certain duration.
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    // Render an error message on the add recipe view in case of any error.
    addRecipeView.renderError(err.message);
  }
};

// Initialization function to set up event handlers for the views and models.
const init = function () {
  // Add event handler to render bookmarks on page load.
  bookmarksView.addHandlerRender(controlLoadBookmark);

  // Add event handler to handle search submission and results.
  searchView.addHandlerSearch(controlSearchResults);

  // Add event handler to render a recipe on page load or hash change.
  recipeView.addHandlerRender(controlRecipe);

  // Add event handler to update servings in the recipe view.
  recipeView.addHandlerUpdateServings(controlServings);

  // Add event handler to handle pagination clicks.
  paginationView.addHandlerClick(controlPagination);

  // Add event handler to handle bookmarking a recipe.
  recipeView.addHandlerBookmark(controlAddBookmark);

  // Add event handler to handle recipe upload.
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

// Call the initialization function to set up the application.
init();

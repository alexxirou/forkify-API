// Import 'async' from 'regenerator-runtime' to enable asynchronous functionality with async/await.
import { async } from 'regenerator-runtime';

// Import constants from 'config.js' and 'helper.js' files.
import { API_URL, KEY, RES_PER_PAGE } from './config.js';
import { AJAX } from './helper.js';

// Create and export the application's state object.
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmark: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

/**
 * Asynchronous function to load a recipe by its ID from the API.
 * @param {string} idr - The ID of the recipe to load.
 * @throws {Error} - If there is an error while loading the recipe.
 */
export const loadRecipe = async function (idr) {
  try {
    // Fetch the recipe data from the API using AJAX.
    const data = await AJAX(API_URL + '' + idr);

    // Extract relevant data from the response using object destructuring.
    const { id, title, publisher, servings, source_url, image_url, cooking_time, ingredients } = data.data.recipe;

    // Create a recipe object with extracted data and store it in the state.
    state.recipe = { id, title, publisher, servings, sourceUrl: source_url, image: image_url, cookingTime: cooking_time, ingredients };

    // Check if the recipe is bookmarked and set the 'bookmarked' property accordingly.
    if (state.bookmark.some(bookmark => bookmark.id === idr)) {
      state.recipe.bookmarked = true;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Asynchronous function to load search results based on the provided query.
 * @param {string} query - The search query.
 * @throws {Error} - If there is an error while loading the search results.
 */
export const loadSearchResults = async function (query) {
  // Store the search query in the state.
  state.search.query = query;

  try {
    // Fetch the search results from the API using AJAX and the provided query.
    const data = await AJAX(API_URL + '?search=' + state.search.query);

    // Map the received data to extract relevant information for each recipe.
    state.search.results = data.data.recipes.map(rec => {
      const { id, title, publisher, image_url } = rec;
      return { id, title, publisher, image: image_url };
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Function to slice and return a portion of search results based on the page number.
 * @param {number} [page=1] - The page number for which to get search results.
 * @returns {Array} - An array of search results for the specified page.
 */
export const getSearchResultsPage = function (page = 1) {
  // Update the current search page in the state.
  state.search.page = page;

  // Calculate the start and end indices to slice the search results array.
  const start = (state.search.page - 1) * state.search.resultsPerPage;
  const end = state.search.page * state.search.resultsPerPage;

  // Return the sliced portion of search results for the specified page.
  return state.search.results.slice(start, end);
};

/**
 * Function to update the number of servings in the recipe and adjust ingredient quantities accordingly.
 * @param {number} newServings - The new number of servings for the recipe.
 */
export const updateServings = function (newServings) {
  // Map through the ingredients and adjust their quantities based on the new number of servings.
  state.recipe.ingredients.map(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });

  // Update the number of servings in the recipe in the state.
  state.recipe.servings = newServings;
};

/**
 * Function to add a recipe to the bookmark list.
 * @param {Object} recipe - The recipe object to add to bookmarks.
 */
export const addBookmark = function (recipe) {
  // Add the recipe to the bookmark array in the state.
  state.bookmark.push(recipe);

  // Set the 'bookmarked' property of the recipe to true.
  state.recipe.bookmarked = true;

  // Persist the bookmarks in the local storage.
  persistBookmark();
};

/**
 * Function to remove a recipe from the bookmark list.
 * @param {Object} recipe - The recipe object to remove from bookmarks.
 */
export const removeBookmark = function (recipe) {
  // Filter out the provided recipe from the bookmark array in the state.
  state.bookmark = state.bookmark.filter(res => res !== recipe);

  // Set the 'bookmarked' property of the recipe to false.
  state.recipe.bookmarked = false;

  // Persist the bookmarks in the local storage.
  persistBookmark();
};

/**
 * Saves the bookmark data to the browser's local storage.
 * It converts the 'state.bookmark' array into a JSON string and stores it in the local storage
 * under the key "bookmarks".
 */

const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};

/**
 * Function to initialize the application by loading bookmarks from local storage.
 * This function should be called when the application starts.
 */
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmark = JSON.parse(storage);
};

// Call the init function to initialize the application.
init();

/**
 * Asynchronous function to upload a new recipe to the API.
 * @param {Object} newRecipe - The new recipe object to be uploaded.
 * @throws {Error} - If there is an error while uploading the new recipe.
 */
export const uploadRecipe = async function (newRecipe) {
  try {
    // Extract ingredients from the new recipe and format them for API request.
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3) {
          throw new Error('Wrong ingredient format! Please use the correct format :)');
        }

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    // Create a recipe object with the formatted data.
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // Upload the new recipe to the API using AJAX.
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

    // Create a recipe object from the API response and store it in the state.
    state.recipe = createRecipeObject(data);

    // Add the uploaded recipe to the bookmarks.
    addBookmark(state.recipe);
  } catch (err) {
    console.log(err);
        throw err;
  }
};

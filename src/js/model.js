// Import constants from 'config.js' and 'helper.js' files.
import { API_URL, KEY, RES_PER_PAGE } from "./config.js";
import { AJAX } from "./helper.js";
import { password, redisEndpoint } from "./env";
import { databaseId } from "./env";
const redis = require("redis");



async function setupRedisClient(redisEndpoint, password, databaseId) {
  // Create a Redis client
  const client = redis.createClient({
    host: redisEndpoint,
    port: 18039,
    password: password,
    db: databaseId
  });

  // Connect to Redis
  await new Promise((resolve, reject) => {
    client.on('connect', () => {
      console.log('Connected to Redis');
      resolve();
    });

    client.on('error', (err) => {
      console.error('Error connecting to Redis:', err);
      reject(err);
    });
  });

  return client;
}



const redisClient = async () => {
  setupRedisClient(redisEndpoint, password, databaseId);
};

//set data to the cache as a has key value pair
const setData = async (key, value, flag = "NX", expiration = 120) => {
  try {
    const reply = await redisClient.hSet(
      `recipe:${key}`,
      JSON.stringify(value),
      flag,
      "EX",
      expiration
    );
    if (reply === "OK") {
      console.log("Data set successfully");
    } else {
      console.log("Recipe data already exists in Redis");
    }
  } catch (err) {
    console.error("Error setting data:", err);
  }
};

//retrieve data from the cache
const getData = async (key) => {
  try {
    const data = await redisClient.hGet(`recipe:${key}`);
    console.log("Retrieved data:", data);
    const parsedData = JSON.parse(data);
    return parsedData; // Return parsed data
  } catch (err) {
    console.error("Error getting data:", err);
    throw err;
  }
};
const existsData = async (key) => {
  try {
    const exists = await redis.hExists(key);
    console.log(`Key '${key}' exists: ${exists}`);
    return exists === 1; // Return true if key exists, false otherwise
  } catch (err) {
    console.error('Error checking key existence:', err);
    throw err;
  }
};


//update data in the cache and return true if update is successful (key exists)
const updateData = async (key, value, expiration = 120) => {
  try {
    const reply = await redisClient.hSet(
      `recipe:${key}`,
      `recipe:${value}`,
      "XX",
      expiration
    );
    return reply === "OK"; // Return true if successful, false otherwise
  } catch (err) {
    console.error("Error setting data:", err);
  }
};

const getObjectsFromQueryHash = async (queryKey) => {
  try {
    // Query key exists, get all objects associated with the query key
    const queryObjects = await redisClient.hGetAll(`objects:${queryKey}`);
    console.log("Retrieved objects associated with query:", queryObjects);
    const results = queryObjects.map((jsonString) => JSON.parse(jsonString));
    return results;
  } catch (err) {
    console.error("Error getting objects associated with query:", err);
    throw err;
  }
};

const addObjectsToQueryHash = async (queryKey, objects) => {
  try {
    // Serialize objects to strings using JSON.stringify
    const serializedObjects = objects.map((obj) => JSON.stringify(obj));

    // Add serialized objects to the hash associated with the query key
    await redisClient.hMSetAll(`objects:${queryKey}`, serializedObjects);
    console.log("Objects added to query hash successfully");
  } catch (err) {
    console.error("Error adding objects to query hash:", err);
    throw err;
  }
};

// Create and export the application's state object.
export const state = {
  recipe: {},
  search: {
    query: "",
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
    let data;
    if (await existsData(idr)) {
      state.recipe = await getData(idr); //check cache first then get the data from the cache
    } else {
      data = await AJAX(API_URL + "" + idr);
      // Fetch the recipe data from the API using AJAX.

      // Extract relevant data from the response using object destructuring.
      const {
        id,
        title,
        publisher,
        servings,
        source_url,
        image_url,
        cooking_time,
        ingredients,
      } = data.data.recipe;

      // Create a recipe object with extracted data and store it in the state.
      state.recipe = {
        id,
        title,
        publisher,
        servings,
        sourceUrl: source_url,
        image: image_url,
        cookingTime: cooking_time,
        ingredients,
      };
    }
    // Check if the recipe is bookmarked and set the 'bookmarked' property accordingly.
    if (state.bookmark.some((bookmark) => bookmark.id === idr)) {
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
    if (existsData(state.search.query)) {
      const results = getObjectsFromQueryHash //check cache first then get the data from the cache
      state.search.results = results;
    }
    else { //checks if the query exists as a key in the cache
    // Fetch the search results from the API using AJAX and the provided query.
    const data = await AJAX(API_URL + "?search=" + state.search.query);
    const results = data.data;
    // Map the received data to extract relevant information for each recipe.
    state.search.results = results.recipes.map((rec) => {
      const { id, title, publisher, image_url } = rec;
      return { id, title, publisher, image: image_url };
    });

    // Store the search results in the cache.
    addObjectsToQueryHash(state.search.results, state.search.query);
    }
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
  state.recipe.ingredients.map((ing) => {
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
  state.bookmark = state.bookmark.filter((res) => res !== recipe);

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
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmark));
};

/**
 * Function to initialize the application by loading bookmarks from local storage.
 * This function should be called when the application starts.
 */
const init = function () {
  const storage = localStorage.getItem("bookmarks");
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
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        if (ingArr.length !== 3) {
          throw new Error(
            "Wrong ingredient format! Please use the correct format :)"
          );
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
    setData(state.recipe.id, state.recipe); //fire and forget cache setting

    addBookmark(state.recipe);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

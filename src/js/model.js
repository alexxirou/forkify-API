// Import constants from 'config.js' and 'helper.js' files.
import { API_URL, KEY, RES_PER_PAGE } from "./config.js";
import { AJAX, graphQL } from "./helper.js";


/**
 * Function to set data recipe to the redis server
 * @param {*} key the key to set data
 * @param {*} data the data to set
 * @param {*} db the database to use
 */
const setData = async (key, data, db = 1) => {
  try {
    if (!key) {
      throw new Error("No key provided");
    }

    if (!data) {
      throw new Error("No data provided");
    }

    const JSONdata = JSON.stringify(data);
    console.log(typeof JSONdata);

    const response = await fetch(`http://localhost:49999/set/${db}/${key}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });

    if (response.ok) {
      console.log("Data set successfully in Redis");
      // Additional success handling if needed
    } else {
      const errorMessage = await response.text(); // Get error message from response body if available
      console.error(`Failed to set data in Redis. Status: ${response.status}. Message: ${errorMessage}`);
      // Handle failure or error response (if needed)
    }
  } catch (error) {
    console.error("Error setting data:", error.message);
    // Handle other errors (if needed)
  }
};

/**
 * Function to get data recipe from the redis server
 * @param {*} key  the key to get data
 * @param {*} db the database number 
 * @returns {data} the recipe data
 */
const getData = async (key, db = 1) => {
  try {
    if (!key) {
      throw new Error("No key provided");
    }
    
    const response = await fetch(`http://localhost:49999/get/${db}/${key}`);

    if (response.ok) {
      console.log("Data fetched successfully from Redis");
      const data = await response.json();
      return data;
    } else {
      const errorMessage = await response.text(); // Get error message from response body if available
      console.error(`Failed to fetch data from Redis. Status: ${response.status}. Message: ${errorMessage}`);
      // Handle failure or error response (if needed)
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    // Handle other errors (if needed)
  }
};

/**
 * Function to check if a key exists in redis
 * @param {*} key 
 * @param {*} db 
 * @returns boolean true if key exists in redis 
 */
const existsData = async (key, db = 1) => {
  try {
    if (!key) {
      throw new Error("No key provided");
    }
    const response = await fetch(`http://localhost:49999/exists/${db}/${key}`);

    if (response.ok) {
      const result = await response.json();
    
      return result.exists;
    } else {
      throw new Error("Failed to check if data exists in Redis");
    }
  } catch (error) {
    console.error("Error checking if data exists:", error);
    // Handle other errors (if needed)
  }
}; 

/**
 * Function to get an array of recipes based on a key provided
 * @param {*} key the key to get data 
 * @param {*} db  the database number to use
 * @returns an array of recipes with each recipe in the form of an object
 */

const getObjectsFromQuerySet = async (key, db = 2) => {
  try {
    if (!key) {
      throw new Error("No key provided");
    }
    const response = await fetch(`http://localhost:49999/smembers/${db}/${key}`);
  if (response.ok) {
    console.log("Data retrieved");
    const data = await response.json();
    //console.log(data);
    return data
  
  } else {
    console.error("Failed to get data in Redis");
    // Handle failure or error response (if needed)
    //console.log(response);
  }
  } catch (error) {
    console.error("Error getting query data:", error);
    // Handle other errors (if needed)
  }
    
    
};


/**
 * Function set an array of recipes based on a key provided in redis as a set
 * @param {*} key  the key to set data
 * @param {*} data the data to set
 * @param {*} db the database number to use
 */

const addObjectsToQuerySet= async (key, data, db = 2) => {
  //console.log(key);
  try {
    if (!key) {
      throw new Error("No key provided");
    }

    if (!data) {
      throw new Error("No data provided");
    }
    JSONdata = JSON.stringify(data);
    //console.log(JSONdata);
    const response = await fetch(`http://localhost:49999/sadd/${db}/${key}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });

    if (response.ok) {
      console.log("Query data set successfully in Redis");
      //console.log(response);
      // Handle success (if needed)
    } else {
      console.error("Failed to set query  data in Redis");
      // Handle failure or error response (if needed)
      //console.log(response);
    }
  } catch (error) {
    //console.error("Error setting data:", error);
    // Handle other errors (if needed)
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

/**
  + * Creates a recipe object based on the provided data.
  + *
  + * @param {Object} data - The data object containing recipe information.
  + * @return {Object} - The recipe object with selected properties from the data object.
  + */

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
  + * Asynchronous function to load a recipe by its ID from the API.
  + * @param {string} idr - The ID of the recipe to load.
  + * @throws {Error} - If there is an error while loading the recipe.
  + */
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
      if (await existsData(state.search.query, 2)) {
        const results = await getObjectsFromQuerySet(state.search.query); //check cache first then get the data from the cache
        state.search.results = results;
      } else {
        //checks if the query exists as a key in the cache
        // Fetch the search results from the API using AJAX and the provided query.
        const data = await AJAX(API_URL + "?search=" + state.search.query);
        const results = data.data;
    
        // Map the received data to extract relevant information for each recipe.
        state.search.results = results.recipes.map((rec) => {
          const { id, title, publisher, image_url } = rec;
          return { id, title, publisher, image: image_url };
        });

        // Fetch the search results from the GraphQL API using the provided query. Not supported
        //const data = await graphQL(API_URL + "?search=" + state.search.query)
        
        //state.search.results = data.recipes;
        
        // Store the search results in the cache.
        addObjectsToQuerySet(state.search.query, state.search.results);
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

/**
 * The base URL for the Recipe API.
 * @type {string}
 */
export const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes/`;

/**
 * The API key used for authentication with the Recipe API.
 * @type {string}
 */
export const KEY = '7c5ff753-4c85-4753-92cf-f0354239d09f'; //should bre replaced with a valid key

/**
 * The timeout duration (in seconds) for API requests.
 * If a request takes longer than this time, it will be considered failed.
 * @type {number}
 */
export const TIME_OUT = 10;

/**
 * The default message to display when a requested recipe is not found.
 * @type {string}
 */
export const NO_RECIPE = "We couldn't find that recipe...";

/**
 * The number of recipes to be displayed per page in the application.
 * @type {number}
 */
export const RES_PER_PAGE = 10;

/**
 * The duration (in seconds) for how long a modal window should remain visible before automatically closing.
 * @type {number}
 */
export const MODAL_CLOSE_SEC = 2.5;

import { TIME_OUT } from "./config";


/**
 * Creates a promise that rejects after a specified duration if not resolved.
 * @param {number} s - The duration in seconds before the promise rejects.
 * @returns {Promise} - A promise that rejects after the specified duration.
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Performs an AJAX request using the Fetch API, with optional timeout support.
 * @param {string} url - The URL for the AJAX request.
 * @param {Object} [uploadData=undefined] - Data to be sent in the request body for POST requests.
 * @returns {Promise} - A promise that resolves to the parsed response data if successful.
 * @throws {Error} - An error is thrown if the AJAX request fails or times out.
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // Create the Fetch API request based on whether uploadData is provided.
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // Race between the Fetch request and the timeout promise.
    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);

    // Parse the response data.
    const data = await res.json();

    // If the response is not ok, throw an error with the error message and status code.
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Return the parsed response data.
    return data;
  } catch (err) {
    // Re-throw any errors that occurred during the AJAX request.
    throw err;
  }
};





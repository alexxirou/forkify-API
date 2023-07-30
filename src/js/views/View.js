// Import the 'icons.svg' file from a specified URL (relative path).
import icons from 'url:../../img/icons.svg';

// Import the 'NO_RECIPE' constant from the '../config' module.
import { NO_RECIPE } from '../config';

/**
 * View class handles rendering and updating data on the DOM.
 * @class
 */
export default class View {
  /**
   * Data object to be rendered on the DOM.
   * @type {Object | Object[]}
   * @private
   */
  _data;

  /**
   * Default error message to display when rendering an error.
   * @type {string}
   * @private
   */
  _errorMessage = NO_RECIPE;

  /**
   * Current message to display in the view.
   * @type {string}
   * @private
   */
  _message = '';

  /**
   * Render the received object to the DOM.
   * @param {Object | Object[]} data - The data to be rendered (e.g. recipe).
   * @param {boolean} [render=true] - If false, creates markup string instead of rendering to the DOM.
   * @returns {undefined | string} - A markup string is returned if render=false.
   * @this {Object} - View instance.
   */
  render(data, render = true) {
    // If data is empty or not provided, render an error message.
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // Store the data to be rendered.
    this._data = data;

    // Generate the markup based on the data.
    const markup = this._generateMarkup();

    // If render is set to false, return the markup string.
    if (!render) return markup;

    // Clear the parent element and insert the generated markup.
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Update the current view with new data.
   * @param {Object | Object[]} data - The updated data to be rendered on the DOM.
   */
  update(data) {
    // Store the updated data.
    this._data = data;

    // Generate the new markup based on the updated data.
    const newMarkup = this._generateMarkup();

    // Create a new DOM fragment from the new markup.
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // Retrieve all new and current elements for comparison.
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Compare and update changed text and attributes in the current DOM.
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  /**
   * Clear the content of the parent DOM element.
   * @private
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Render a spinner (loading indicator) on the DOM.
   */
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render an error message on the DOM.
   * @param {string} [message=this._errorMessage] - The error message to display.
   */
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render a success message on the DOM.
   * @param {string} [message=SUCCESS_MESSAGE] - The success message to display.
   */
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Other methods and functionalities can be added here as needed.

  // Private helper methods for generating markup and other internal operations can also be added below.
}

import View from './View.js';
import icons from 'url:../../img/icons.svg';

/**
 * AddRecipeView class represents the view for uploading new recipes.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */
class AddRecipeView extends View {
  /**
   * The parent element where the new recipe upload view is rendered.
   * @type {HTMLElement}
   * @private
   */
  _parentElement = document.querySelector('.upload');

  /**
   * The success message to be displayed when a recipe is successfully uploaded.
   * @type {string}
   * @protected
   */
  _message = 'Recipe was successfully uploaded :)';

  /**
   * The window element that represents the add recipe modal.
   * @type {HTMLElement}
   * @private
   */
  _window = document.querySelector('.add-recipe-window');

  /**
   * The overlay element used to hide the add recipe modal.
   * @type {HTMLElement}
   * @private
   */
  _overlay = document.querySelector('.overlay');

  /**
   * The button element that opens the add recipe modal.
   * @type {HTMLElement}
   * @private
   */
  _btnOpen = document.querySelector('.nav__btn--add-recipe');

  /**
   * The button element that closes the add recipe modal.
   * @type {HTMLElement}
   * @private
   */
  _btnClose = document.querySelector('.btn--close-modal');

  /**
   * Constructor function for the AddRecipeView class.
   * Initializes event handlers to show and hide the add recipe modal.
   */
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  /**
   * Toggles the visibility of the add recipe modal and overlay by adding or removing the 'hidden' class.
   */
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  /**
   * Adds an event listener to the button that opens the add recipe modal.
   * When the button is clicked, the toggleWindow method is called to show the modal.
   * @private
   */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   * Adds event listeners to the button that closes the add recipe modal and the overlay element.
   * When either of these elements is clicked, the toggleWindow method is called to hide the modal.
   * @private
   */
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   * Adds an event listener for handling recipe upload form submission.
   * When the form is submitted, it prevents the default form submission behavior,
   * converts the form data to an object, and calls the handler function with the data.
   * @param {Function} handler - The handler function to be called when a recipe is uploaded.
   */
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  /**
   * Generates the markup for the add recipe view (currently empty).
   * This method is not implemented in this class since the add recipe view doesn't require any specific markup.
   * @returns {string} An empty string, as there is no markup to be generated for this view.
   * @protected
   * @override
   */
  _generateMarkup() {
    return '';
  }
}

// Export an instance of the AddRecipeView class to be used throughout the application
export default new AddRecipeView();

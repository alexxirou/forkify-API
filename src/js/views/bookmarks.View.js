import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

/**
 * BookmarksView class represents the view for displaying bookmarked recipes.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */
class BookmarksView extends View {
  /**
   * The parent element where the bookmarked recipes view is rendered.
   * @type {HTMLElement}
   * @private
   */
  _parentElement = document.querySelector('.bookmarks__list');

  /**
   * The error message to be displayed when there are no bookmarked recipes.
   * @type {string}
   * @protected
   */
  _errorMessage = 'No bookmarks yet.';

  /**
   * Adds an event listener for handling the rendering of bookmarked recipes.
   * When the page is loaded, the handler function is called to render the bookmarked recipes.
   * @param {Function} handler - The handler function to be called when rendering bookmarks.
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Generates the markup for displaying bookmarked recipes.
   * It uses the _data object, which contains an array of bookmarked recipes,
   * and passes each bookmark to the previewView to generate the preview markup.
   * The preview markup for all bookmarks is then joined and returned as the result.
   * @returns {string} The HTML markup for displaying bookmarked recipes.
   * @protected
   * @override
   */
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

// Export an instance of the BookmarksView class to be used throughout the application
export default new BookmarksView();

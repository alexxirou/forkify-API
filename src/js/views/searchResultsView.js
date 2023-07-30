import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

/**
 * ResultsView class represents the view for displaying search results in the Forkify recipe application.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */
class ResultsView extends View {
  /**
   * The parent element where the search results view is rendered.
   * @type {HTMLElement}
   * @private
   */
  _parentElement = document.querySelector('.results');

  /**
   * Generates the markup for displaying the search results.
   * It maps over the _data array and calls the previewView's render method to generate the markup for each search result.
   * The individual result markups are then joined together into a single string and returned.
   * @returns {string} The HTML markup for displaying the search results.
   * @protected
   * @override
   */
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

// Export an instance of the ResultsView class to be used throughout the application
export default new ResultsView();

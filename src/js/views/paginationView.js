import View from './View.js';
import icons from 'url:../../img/icons.svg';

/**
 * PaginationView class represents the view for displaying pagination buttons in the search results.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */
class PaginationView extends View {
  /**
   * The parent element where the pagination buttons view is rendered.
   * @type {HTMLElement}
   * @private
   */
  _parentElement = document.querySelector('.pagination');

  /**
   * Adds an event listener for handling clicks on the pagination buttons.
   * When a button is clicked, it finds the nearest button element with the class "btn--inline"
   * and retrieves the "goto" attribute value (page number) to handle the pagination.
   * @param {Function} handler - The handler function to be called when a pagination button is clicked.
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  /**
   * Generates the markup for displaying the pagination buttons.
   * The markup includes previous and next buttons with their respective page numbers.
   * @returns {string} The HTML markup for displaying the pagination buttons.
   * @protected
   * @override
   */
  _generateMarkup() {
    const { page, results, resultsPerPage } = this._data;
    const numPages = Math.ceil(results.length / resultsPerPage);

    if (numPages <= 1) return '';

    let markup = '';

    if (page > 1) {
      markup += this.createPaginationButton(page - 1, 'prev');
    }

    if (page < numPages) {
      markup += this.createPaginationButton(page + 1, 'next');
    }

    return markup;
  }

  /**
   * Creates a single pagination button with the specified page number and type (prev or next).
   * The button includes an SVG icon (arrow left or arrow right) and the page number.
   * @param {number} page - The page number for the button.
   * @param {string} type - The type of the button (prev or next).
   * @returns {string} The HTML markup for the pagination button.
   */
  createPaginationButton(page, type) {
    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${page}</span>
      </button>
    `;
  }
}

// Export an instance of the PaginationView class to be used throughout the application
export default new PaginationView();

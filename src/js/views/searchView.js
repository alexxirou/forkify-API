/**
 * SearchView class represents the view for the search functionality in the Forkify recipe application.
 * It handles interactions with the search input and form, allowing users to enter a search query and submit it.
 */
class SearchView {
  /**
   * The parent element where the search view is rendered.
   * @type {HTMLElement}
   * @private
   */
  _parentElement = document.querySelector('.search');

  /**
   * Retrieves the search query entered by the user in the search input field.
   * After getting the query, it clears the input field for the next search.
   * @returns {string} The search query entered by the user.
   */
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  /**
   * Private helper method to clear the search input field after the query is retrieved.
   * This keeps the search view tidy and ready for the next search.
   * @private
   */
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  /**
   * Adds an event listener for the search form submission.
   * When the user submits the search form, the provided handler function will be called to handle the search functionality.
   * @param {Function} handler - The handler function to be called when the form is submitted.
   */
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

// Export an instance of the SearchView class to be used throughout the application
export default new SearchView();

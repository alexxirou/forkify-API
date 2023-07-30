import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

/**
 * PreviewView class represents the view for displaying recipe previews in the search results.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */
class PreviewView extends View {
  /**
   * The parent element where the recipe preview view is rendered.
   * @type {string}
   * @private
   */
  _parentElement = '';

  /**
   * Generates the markup for displaying a single recipe preview.
   * It uses the _data object to fill in the relevant information for the recipe.
   * The markup includes the recipe's image, title, publisher, and user-generated icon (if applicable).
   * If the recipe's ID matches the current URL hash, it will be marked as active with a special class.
   * @returns {string} The HTML markup for displaying the recipe preview.
   * @protected
   * @override
   */
  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${
              this._data.key ? '' : 'hidden'
            }">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}

// Export an instance of the PreviewView class to be used throughout the application
export default new PreviewView();

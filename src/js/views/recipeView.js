import icons from 'url:../../img/icons.svg';
import Fraction from 'fractional';
import { mark } from 'regenerator-runtime';
import View from './View.js';

/**
 * RecipeView class represents the view for displaying a recipe in the Forkify recipe application.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */
class RecipeView extends View {
  /**
   * The parent element where the recipe view is rendered.
   * @type {HTMLElement}
   */
  _parentElement = document.querySelector('.recipe');

  /**
   * Generates the markup for displaying the recipe details.
   * @returns {string} The HTML markup for displaying the recipe.
   * @protected
   * @override
   */
  _generateMarkup() {
    const ingredientsHTML = this._markUpIngredient(this._data.ingredients);
    const recipeHTML = `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">Servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings - 1}">
              <svg>
                <use href="${icons}#icon-minus-circle "></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings + 1}">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
          </svg>
        </button>
      </div>
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${ingredientsHTML}
        </ul>
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${this._data.sourceUrl}">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
    return recipeHTML;
  }

  /**
   * Generates the markup for displaying the list of ingredients.
   * @param {Array} ingredients - The array of ingredient objects.
   * @returns {string} The HTML markup for displaying the list of ingredients.
   * @private
   */
  _markUpIngredient(ingredients) {
    return ingredients
      .map(
        ingredient => `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ''}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ingredient.unit || ''}</span>
              ${ingredient.description}
            </div>
          </li>
        `
      )
      .join('');
  }

  /**
   * Adds an event listener for rendering the recipe view.
   * The view is rendered when the page loads or the hash in the URL changes.
   * @param {Function} handler - The handler function to be called when rendering the recipe view.
   */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  /**
   * Adds an event listener for updating the number of servings.
   * @param {Function} handler - The handler function to be called when updating the servings.
   */
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--increase-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  /**
   * Adds an event listener for bookmarking the recipe.
   * @param {Function} handler - The handler function to be called when bookmarking the recipe.
   */
  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
}

// Export an instance of the RecipeView class to be used throughout the application
export default new RecipeView();

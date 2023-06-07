import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  // eslint-disable-next-line
  getTemplate() {
    return `
      <div id="content" class="content">
        <h2 id="favorite-restaurants" class="content__heading">
        <a id="content__heading__title" href="#/favorite">Restoran Favorit</a>
        </h2>
        <input id="query" type="text" placeholder="tuliskan nama restoran">
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  }

  //   eslint-disable-next-line
  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  // eslint-disable-next-line
  showFavoriteRestaurants(restaurants) {
    if (!restaurants) {
      return;
    }

    let html;
    console.log(restaurants);
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  // eslint-disable-next-line
  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
      Restoran tidak ditemukan
      </div>
    `;
  }
}

export default FavoriteRestaurantSearchView;

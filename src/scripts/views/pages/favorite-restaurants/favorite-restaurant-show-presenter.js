class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    this._showFavoriteRestaurants();
  }

  async _showFavoriteRestaurants() {
    const Restaurants = await this._favoriteRestaurants.getAllRestaurants();
    this._displayRestaurants(Restaurants);
  }

  _displayRestaurants(Restaurants) {
    this._view.showFavoriteRestaurants(Restaurants);
  }
}

export default FavoriteRestaurantShowPresenter;

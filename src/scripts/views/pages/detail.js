import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import {
  createRestaurantDetailTemplate, createRestaurantFoodTemplate, createRestaurantDrinkTemplate,
  createCustomerReviews,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
              <div id="restaurant" class=""restaurant></div>
              <div id="restaurant-menu" class="restaurant-menu">
                <h3>Makanan</h3>
                <div id="restaurant-menu-foods" class="restaurant-menu-foods"></div>
                <h3>Minuman</h3>
                <div id="restaurant-menu-drinks" class="restaurant-menu-drinks"></div>
              </div>
              <div id="customer-reviews">
                <h3>Review Pengunjung</h3>
                <div id="customer-review" class="customer-review"></div>
              </div>
              <div id="likeButtonContainer"></div>
          `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantFoods = await restaurant.menus.foods;
    const restaurantDrinks = await restaurant.menus.drinks;
    const reviewCustomers = await restaurant.customerReviews;
    const restaurantContainer = document.querySelector('#restaurant');
    const foodsContainer = document.querySelector('#restaurant-menu-foods');
    const drinksContainer = document.querySelector('#restaurant-menu-drinks');
    const reviewContainer = document.querySelector('#customer-review');
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    restaurantFoods.forEach((food) => {
      foodsContainer.innerHTML += createRestaurantFoodTemplate(food);
    });
    restaurantDrinks.forEach((drink) => {
      drinksContainer.innerHTML += createRestaurantDrinkTemplate(drink);
    });
    reviewCustomers.forEach((review) => {
      reviewContainer.innerHTML += createCustomerReviews(review);
    });
  },
};

export default Detail;

import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantDetailTemplate = (restaurant) => `
    <h2 class="restaurant__name">${restaurant.name}</h2>
    <img crossorigin="anonymous" class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
    <div class="restaurant__info">
        <h3>Informasi</h3>
        <h4>Kabupaten/Kota</h4>
        <p>${restaurant.city}</p>
        <h4>Alamat</h4>
        <p>${restaurant.address}</p>
        <h4>Rating</h4>
        <p>⭐️ ${restaurant.rating}</p>
    </div>
    <div class="restaurant-overview">
        <h3>Overview</h3>
        <p>${restaurant.description}</p>
    </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img crossorigin="anonymous" class="lazyload" id="restaurant-item__header__poster" alt="${restaurant.name || '-'}"
           data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating || '-'}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__name"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h3>
      <h4>${restaurant.city || '-'}</h4>
      <p>${restaurant.description || '-'}</p>
    </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createRestaurantFoodTemplate = (food) => `
  <div id="foods" class="foods">${food.name}</div>
`;

const createRestaurantDrinkTemplate = (drink) => `
  <div id="drinks" class="drinks">${drink.name}</div>
`;

const createCustomerReviews = (review) => `
  <div id="review-item" class="review-item">
    <h4> &#8226 ${review.name} </h4>
    <h5>${review.date} </h5>
    <p>${review.review}</p>
  </div>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createRestaurantFoodTemplate,
  createRestaurantDrinkTemplate,
  createCustomerReviews,
};

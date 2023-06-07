const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  // // eslint-disable-next-line
  // pause();
  I.see('Restoran tidak ditemukan', '.restaurant-item__not__found');

  I.amOnPage('/#/list');

  I.waitForElement('.restaurant__name');
  I.seeElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const likedRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Restoran tidak ditemukan', '.restaurant-item__not__found');

  I.amOnPage('/#/list');

  I.waitForElement('.restaurant__name');
  I.seeElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  I.click(firstRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const firstlikedRestaurant = locate('.restaurant__name a').first();
  I.click(firstlikedRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Restoran tidak ditemukan', '.restaurant-item__not__found');
});

Scenario('searching favorite restaurants', async ({ I }) => {
  I.see('Restoran tidak ditemukan', '.restaurant-item__not__found');

  I.amOnPage('/#/list');

  I.waitForElement('.restaurant__name');
  I.seeElement('.restaurant__name a');

  const names = [];

  for (let i = 1; i <= 3; i += 1) {
    I.click(locate('.restaurant__name a').at(i));
    I.waitForElement('#likeButton');
    I.seeElement('#likeButton');
    I.click('#likeButton');

    // eslint-disable-next-line
    names.push(await I.grabTextFrom('.restaurant__name'));
    I.amOnPage('/#/list');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = names[1].substring(1, 3);
  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  matchingRestaurants.forEach(async (name, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.restaurant__name').at(index + 1));
    assert.strictEqual(name, visibleTitle);
  });
});

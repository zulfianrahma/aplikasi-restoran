import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/favorite-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/favorite-restaurants/favorite-restaurant-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    // eslint-disable-next-line max-len
    presenter = new FavoriteRestaurantSearchPresenter({ favoriteRestaurants, view });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restoran a');

      expect(presenter.latestQuery)
        .toEqual('restoran a');
    });

    it('should ask the model to search for liked restaurants', () => {
      searchRestaurants('restoran b');

      expect(favoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('restoran b');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restoran a').and.returnValues([
        { id: 111, name: 'restoran anak' },
        { id: 222, name: 'ada juga restoran ayah' },
        { id: 333, name: 'ini juga boleh restoran ayam' },
      ]);

      searchRestaurants('restoran a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames = document.querySelectorAll('.restaurant__name');

          expect(restaurantNames.item(0).textContent).toEqual('restoran anak');
          expect(restaurantNames.item(1).textContent).toEqual('restoran ayah');
          expect(restaurantNames.item(2).textContent).toEqual('restoran ayam');

          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restoran a').and.returnValues([
        { id: 1, name: 'restoran anak' },
        { id: 2, name: 'restoran ayah' },
        { id: 3, name: 'restoran ayam' },
      ]);

      searchRestaurants('restoran a');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames = document.querySelectorAll('.restaurant__name');

          expect(restaurantNames.item(0).textContent).toEqual('-');

          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restoran a').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurants('restoran a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('     ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants(' ');

      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restoran a').and.returnValues([]);

      searchRestaurants('restoran a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restoran a').and.returnValues([]);

      searchRestaurants('restoran a');
    });
  });
});

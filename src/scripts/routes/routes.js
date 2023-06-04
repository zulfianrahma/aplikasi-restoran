import Detail from '../views/pages/detail';
import Home from '../views/pages/home';
import ListRestaurant from '../views/pages/list';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/list': ListRestaurant,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;

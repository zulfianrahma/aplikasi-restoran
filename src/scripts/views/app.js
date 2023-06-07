import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import ScrollToContentInitiator from '../utils/scroll-to-content';

class App {
  constructor({
    button, drawer, content, hero, skipButton,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._hero = hero;
    this._skipButton = skipButton;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
      hero: this._hero,
    });
    ScrollToContentInitiator.init({
      skipButton: this._skipButton,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;

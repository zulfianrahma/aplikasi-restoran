const ScrollToContentInitiator = {
  init({ skipButton }) {
    skipButton.addEventListener('click', (event) => {
      this._selectContent(event);
    });
  },

  _selectContent(event) {
    event.stopPropagation();
    if (location.hash === '#/list') {
      document.querySelector('#content__heading__title').focus();
      this._scrollPage();
    } else if (location.hash === '#/favorite') {
      document.querySelector('#content__heading__title').focus();
      this._scrollPage();
    } else {
      console.log('this page is not yet customize');
    }
  },

  _scrollPage() {
    if (window.innerWidth <= 799) {
      document.body.scrollTop = 300; // For Safari
      document.documentElement.scrollTop = 300; // For Chrome, Firefox, IE and Opera
    } else {
      document.body.scrollTop = 320; // For Safari
      document.documentElement.scrollTop = 320; // For Chrome, Firefox, IE and Opera
    }
  },
};

export default ScrollToContentInitiator;

const Home = {
  async render() {
    return `
            <div id="content" class="content">
              <h2 class="content__heading">Beranda</h2>
            </div> 
          `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render
  },
};

export default Home;

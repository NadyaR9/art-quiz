import { audio } from '../../utils/audio';
import './Home.scss';

const getSettings = () => JSON.parse(localStorage.getItem('volumeSettings'));

export class Home {
  async render() {
    return `
      <section class="screen">
        <div class="intro" >
          <a href="#/settings"> <div id="settings"></div></a>
          <div class="intro__content">
            <div class="intro__logo">
              <h1 class="logo">Art Quiz</h1>
            </div>
            <div class="intro__btns">
              <a href="#/categories"><button class="btn btn_artists" >Художники</button></a>
              <a href="#/categories"><button class="btn btn_pictures" >Картины</button></a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async after_render() {
    const btnArtists = document.querySelector('.btn_artists');
    const btnPictures = document.querySelector('.btn_pictures');
    btnArtists.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      sessionStorage.setItem('category', 'questionsByArtist');
    });
    btnPictures.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      sessionStorage.setItem('category', 'questionsByPicture');
    });
    const settings = getSettings();
    audio.muted = settings.mute;
    audio.volume = settings.volume;
  }
}

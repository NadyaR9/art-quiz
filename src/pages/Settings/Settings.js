import { audio } from '../../utils/audio';
import './Settings.scss';

export class Settings {
  async render() {
    return `
    <section class="screen">
      <section class="settings">
        <header class="navigation">
          <a href="#/"><div class="navigation__back"></div></a>
          <h1 class="navigation__title">Настройки</h1>
          <div class="navigation__next"></div>
        </header>
        <section class="settings__volume">
          <h4 class="settings__title">Громкость</h4>
          <div class="settings__volume-progress">
            <input class="volume-range" type="range" min="0" max="100" step="1">
          </div>
          <div class="settings__volume-icons">
            <div class="settings__volume-icons_mute"></div>
            <div class="settings__volume-icons_unmute"></div>
          </div>
        </section>
        <section class="settings__time-game">
          <h4 class="settings__title">На время</h4>
          <div class="settings__switch">
            <span>On</span>
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
        </section>
        <section class="settings__time-answer">
          <h4 class="settings__title">Время ответа</h4>
          <div class="settings__time-answer__btns">
            <button class="btn btn_number" type="button" onclick="this.nextElementSibling.stepDown()">–</button>
            <input type="number" min="5" max="20" value="5" step="5" readonly="readonly">
            <button class="btn btn_number" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
          </div>
        </section>
        <div class="settings__btns">
          <button class="btn btn_setting reset">Сбросить</button>
          <button class="btn btn_setting btn_pink save">Сохранить</button>
        </div>
      </section>
    </section>
    `;
  }

  async after_render() {
    const volumeRange = document.querySelector('input[type=range]');
    const mute = document.querySelector('.settings__volume-icons_mute');
    const unmute = document.querySelector('.settings__volume-icons_unmute');
    const save = document.querySelector('.save');
    const reset = document.querySelector('.reset');
    function changeVolumeBar() {
      audio.volume = this.value / 100;
      if (this.value === 0) {
        audio.muted = true;
        unmute.classList.remove('on');
        mute.classList.add('on');
      } else {
        audio.muted = false;
        unmute.classList.add('on');
        mute.classList.remove('on');
      }
      this.style.background = `-webkit-linear-gradient(left, var(--second-color) 0%, var(--second-color) ${this.value}%, #A4A4A4 ${this.value}%, #A4A4A4 100%)`;
    }
    volumeRange.addEventListener('input', changeVolumeBar);
    mute.addEventListener('click', () => {
      volumeRange.value = 0;
      audio.volume = 0;
      volumeRange.style.background = '-webkit-linear-gradient(left, var(--second-color) 0%, var(--second-color) 0%, #A4A4A4 0%, #A4A4A4 100%)';
      mute.classList.add('on');
      unmute.classList.remove('on');
      audio.muted = true;
    });
    unmute.addEventListener('click', () => {
      volumeRange.value = 50;
      audio.volume = 0.5;
      volumeRange.style.background = `-webkit-linear-gradient(left, var(--second-color) 0%, var(--second-color) ${volumeRange.value}%, #A4A4A4 ${volumeRange.value}%, #A4A4A4 100%)`;
      unmute.classList.add('on');
      mute.classList.remove('on');
      audio.muted = false;
    });
    reset.addEventListener('click', () => {
      volumeRange.value = 50;
      audio.volume = 0.5;
      volumeRange.style.background = `-webkit-linear-gradient(left, var(--second-color) 0%, var(--second-color) ${volumeRange.value}%, #A4A4A4 ${volumeRange.value}%, #A4A4A4 100%)`;
    });
    save.addEventListener('click', () => {
      const volumeSettings = {
        mute: audio.muted,
        volume: audio.volume,
      };
      localStorage.setItem('volumeSettings', JSON.stringify(volumeSettings));
    });
  }
}

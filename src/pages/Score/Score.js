import {
  newQuestionsByArtist as categoriesArtist,
  newQuestionsByPicture as categoriesPicture,
} from '../Categories/Categories';
import { Card } from '../../components/Card';
import { Menu } from '../../components/Menu';
import { ModalScore } from '../../components/ModalScore/ModalScore';

export class Score {
  getCategoryIndex = () => {
    return sessionStorage.getItem('categoryIndex');
  };

  arrCategory = () => {
    if (this.getCategoryQuestions() === 'questionsByPicture') {
      return categoriesPicture[sessionStorage.getItem('categoryIndex')];
    }
    return categoriesArtist[sessionStorage.getItem('categoryIndex')];
  };

  getCategoryQuestions = () => {
    return sessionStorage.getItem('category');
  };

  getScore = (i) => {
    const score = localStorage.getItem(`${this.getCategoryQuestions()}${i}`);
    return JSON.parse(score);
  };

  renderCards = (arr) => {
    const resultTemplate = [];
    for (let i = 0; i < arr.length; i++) {
      resultTemplate.push(
        new Card(`assets/data/img/${arr[i].imageNum}.jpg`, '', '', '', 'score', '').template(),
      );
    }
    return resultTemplate.join('');
  };

  async render() {
    const currentCategoryIndex = +this.getCategoryIndex() + 1;
    let currentCategory;
    if (this.getCategoryQuestions() === 'questionsByPicture') {
      currentCategory = 'Картины';
    } else {
      currentCategory = 'Художники';
    }
    return `
      <section class="screen">
        <section class="category">
          <header class="category__header">
            <div class="logo"><span>Art</span> Quiz</div>
            <a href="#/settings"> 
              <div id="settings"></div>
            </a>
          </header>
          <h4 class="category__title">Результат для ${currentCategoryIndex} раунда по категории ${currentCategory}</h4>
          <div class="category__container">
            <div class="category__inner-container">
              ${this.renderCards(this.arrCategory())}
            </div>
          </div>
          ${new Menu().render()}
        </section>
        <div class="overlay hide">
        </div>
      </section>
    `;
  }

  async after_render() {
    const cards = document.querySelectorAll('.card');
    const overlay = document.querySelector('.overlay');
    const score = this.getScore(this.getCategoryIndex());
    for (const key in score) {
      if (!score[key]) {
        cards[key].classList.add('card_wrong');
      }
    }
    cards.forEach((item, index) => {
      item.addEventListener('click', () => {
        overlay.classList.remove('hide');
        overlay.classList.add('show');
        const modal = new ModalScore(this.arrCategory()[index]);
        overlay.innerHTML = modal.render();
        modal.after_render();
      });
    });
  }
}

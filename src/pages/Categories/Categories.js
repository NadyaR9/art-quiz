import { Menu } from '../../components/Menu';
import { Card } from '../../components/Card';
import { TOTAL_QUESTION } from '../../utils/consts';

import images from '../../utils/images';

function chunkArray(arr, chunk) {
  const resultArr = [];
  for (let i = 0; i < arr.length; i += chunk) {
    resultArr.push(arr.slice(i, i + chunk));
  }
  return resultArr;
}
export const questionsByArtist = [];
export const questionsByPicture = [];

images.forEach((item, index) => {
  if (index % 2 === 0) {
    questionsByArtist.push({
      ...item,
      type: 'Artist',
    });
  }
  if (index % 2 !== 0) {
    questionsByPicture.push({
      ...item,
      type: 'Picture',
    });
  }
});

export const pull = [];
export const uniqAnswersByArtist = [...new Set(questionsByArtist.map((item) => item.author))];
export const uniqAnswersByPicture = [
  ...new Set(
    questionsByPicture.map((item) => {
      pull.push({
        author: item.author,
        imageNum: item.imageNum,
      });
      return pull;
    }),
  ),
];

export const newQuestionsByArtist = chunkArray(questionsByArtist, TOTAL_QUESTION);
export const newQuestionsByPicture = chunkArray(questionsByPicture, TOTAL_QUESTION);

export const questions = {
  questionsByArtist: newQuestionsByArtist,
  questionsByPicture: newQuestionsByPicture,
};

export class Categories {
  pageCategories = () => questions[sessionStorage.getItem('category')];

  getCategoryQuestions = () => sessionStorage.getItem('category');

  getScore = (i) => {
    const rightAnswer = localStorage.getItem(`${this.getCategoryQuestions()}${i}Right`);
    if (rightAnswer != null) {
      return `${rightAnswer} / ${TOTAL_QUESTION}`;
    }
    return '  ';
  };

  isPlayed = (i) => {
    if (localStorage.getItem(`${this.getCategoryQuestions()}${i}Right`)) {
      return true;
    }
    return false;
  };

  getPlaydRound = () => {
    const result = [];
    for (let i = 0; i < newQuestionsByArtist.length; i++) {
      result.push(this.isPlayed(i));
    }
    return result;
  };

  renderCards(arr) {
    const resultTemplate = [];
    const category = sessionStorage.getItem('category');
    for (let i = 0; i < newQuestionsByArtist.length; i++) {
      const currentScore = this.getScore(i);
      resultTemplate.push(
        new Card(
          `assets/data/img/${arr[i][0].imageNum}.jpg`,
          `category${i + 1}`,
          `Категория ${i + 1}`,
          currentScore,
          category,
          i,
        ).template(),
      );
    }
    return resultTemplate.join('');
  }

  async render() {
    const menu = new Menu('category');
    return `
      <section class="screen">
        <section class="category">
          <header class="category__header">
            <div class="logo"><span>Art</span> Quiz</div>
            <a href="#/settings" class="category__setting"> <div id="settings"></div></a>
          </header>
          <h3 class="category__title">Категории</h3>
          <section class="category__container">
            <div class="category__inner-container">
              ${this.renderCards(this.pageCategories())}
            </div>
          </section>
          ${menu.render()} 
        </section>
      </section>
    `;
  }

  async after_render() {
    const categories = document.querySelectorAll('.category__card');
    const playedCategories = this.getPlaydRound();
    const cards = document.querySelectorAll('.card__img');
    categories.forEach((item) => {
      item.addEventListener('click', function () {
        const value = this.dataset.category;
        sessionStorage.setItem('categoryIndex', value);
      });
    });
    playedCategories.forEach((item, index) => {
      if (!item) {
        cards[index].classList.add('card__img_wrong');
      }
    });
  }
}

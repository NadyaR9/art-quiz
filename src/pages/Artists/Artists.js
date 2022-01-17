import {
  uniqAnswersByArtist as answers,
  newQuestionsByArtist as categories,
} from '../Categories/Categories';
import { ArtistCard } from '../../components/ArtistCard';
import { Modal } from '../../components/Modal';
import { Answer } from '../../components/Answer';
import { audio } from '../../utils/audio';
import { playList } from '../../utils/playList';
import { shuffle } from '../../utils/shuffleArray';
import { randomIndex } from '../../utils/randomIndex';
import { TOTAL_QUESTION } from '../../utils/consts';
import './Artists.scss';

export class Artists {
  currentCategory = () => sessionStorage.getItem('categoryIndex');

  getCategoryQuestions = () => sessionStorage.getItem('category');

  answersByCategory = () => categories[this.currentCategory()];

  makeQuestions = (i, arr) => {
    const questions = [];
    let checkDuplicate = [];
    for (let j = 0; j < 3; j++) {
      questions.push(answers[randomIndex(j, answers.length - 1)]);
    }
    questions.push(arr.author);
    shuffle(questions);
    checkDuplicate = new Set(questions);
    if (checkDuplicate.size !== questions.length) {
      return this.makeQuestions(i, arr);
    }
    return checkDuplicate;
  };

  makePullQuestions = () => {
    const answersByCategory = this.answersByCategory();
    const questions = {};
    for (let i = 0; i < answersByCategory.length; i++) {
      questions[i] = this.makeQuestions(i, answersByCategory[i]);
    }
    return questions;
  };

  renderQuestion(arr, questions) {
    const resultTemplate = [];
    for (let i = 0; i < arr.length; i++) {
      resultTemplate.push(new ArtistCard(arr[i].author, arr[i].imageNum, questions[i]).render());
    }
    return resultTemplate.join('');
  }

  async render() {
    const pullAnswers = this.answersByCategory();
    const pullQuestions = this.makePullQuestions();
    return `
      <section class="screen">
        <section class="artist">
          <header class="artist__header header">
            <div class="header__close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.64493 7.99989L14.6616 2.99489C14.8813 2.7752 15.0047 2.47724 15.0047 2.16656C15.0047 1.85587 14.8813 1.55791 14.6616 1.33822C14.4419 1.11854 14.1439 0.995117 13.8333 0.995117C13.5226 0.995117 13.2246 1.11854 13.0049 1.33822L7.99993 6.35489L2.99493 1.33822C2.77524 1.11854 2.47728 0.995117 2.1666 0.995117C1.85591 0.995117 1.55795 1.11854 1.33826 1.33822C1.11857 1.55791 0.995155 1.85587 0.995155 2.16656C0.995155 2.47724 1.11857 2.7752 1.33826 2.99489L6.35493 7.99989L1.33826 13.0049C1.22891 13.1133 1.14212 13.2424 1.08289 13.3845C1.02366 13.5267 0.993164 13.6792 0.993164 13.8332C0.993164 13.9872 1.02366 14.1397 1.08289 14.2819C1.14212 14.4241 1.22891 14.5531 1.33826 14.6616C1.44672 14.7709 1.57575 14.8577 1.71792 14.9169C1.86009 14.9762 2.01258 15.0067 2.1666 15.0067C2.32061 15.0067 2.4731 14.9762 2.61527 14.9169C2.75744 14.8577 2.88647 14.7709 2.99493 14.6616L7.99993 9.64489L13.0049 14.6616C13.1134 14.7709 13.2424 14.8577 13.3846 14.9169C13.5268 14.9762 13.6792 15.0067 13.8333 15.0067C13.9873 15.0067 14.1398 14.9762 14.2819 14.9169C14.4241 14.8577 14.5531 14.7709 14.6616 14.6616C14.7709 14.5531 14.8577 14.4241 14.917 14.2819C14.9762 14.1397 15.0067 13.9872 15.0067 13.8332C15.0067 13.6792 14.9762 13.5267 14.917 13.3845C14.8577 13.2424 14.7709 13.1133 14.6616 13.0049L9.64493 7.99989Z"
                  fill="white" />
              </svg>
            </div>
              <div class="header__progress">
                <input class="time-progress" type="range" name="time-progress" id="time-progress">
              </div>
              <div class="header__time">3:49</div>
          </header>
          <section class="artist__question"><h4 class="question">Кто автор этой картины?</h4>
            <div class="artist__list">        
              ${this.renderQuestion(pullAnswers, pullQuestions)}
            </div>   
          </section>
        </section>
        <div class="overlay hide">
        </div>
      </section>
    `;
  }

  async after_render() {
    const quitGame = document.querySelector('.header__close');
    const cards = document.querySelectorAll('.artist__item');
    const overlay = document.querySelector('.overlay');
    const btns = document.querySelectorAll('.btn_question');
    quitGame.addEventListener('click', () => {
      overlay.classList.remove('hide');
      overlay.classList.add('show');
      const modal = new Modal();
      overlay.innerHTML = modal.render();
      modal.after_render();
    });
    let currentQuestion = 0;
    let countRight = 0;
    const currentScore = {};
    const saveScore = (score, right) => {
      const currentCategory = this.currentCategory();
      localStorage.setItem(
        `${this.getCategoryQuestions()}${currentCategory}`,
        JSON.stringify(score),
      );
      localStorage.setItem(`${this.getCategoryQuestions()}${currentCategory}Right`, right);
    };
    function checkFinish(current, right, score) {
      if (current === TOTAL_QUESTION) {
        overlay.classList.remove('hide');
        overlay.classList.add('show');
        const modal = new Modal(right);
        overlay.innerHTML = modal.render();
        modal.after_render();
        saveScore(score, right);
      }
    }
    function changeCard(i) {
      cards.forEach((item, index) => {
        if (index !== i) {
          item.classList.add('hide');
          item.classList.remove('show');
        } else {
          cards[i].classList.add('show');
          cards[i].classList.remove('hide');
        }
      });
    }
    changeCard(0);
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.textContent === this.answersByCategory()[currentQuestion].author) {
          overlay.classList.remove('hide');
          overlay.classList.add('show');
          countRight++;
          currentScore[currentQuestion] = true;
          const rightAnswer = new Answer(true, this.answersByCategory()[currentQuestion]);
          audio.src = playList[0].src;
          audio.play();
          overlay.innerHTML = rightAnswer.render();
          rightAnswer.after_render();
          const next = document.querySelector('.modal__btn-answer');
          next.addEventListener('click', () => {
            overlay.classList.remove('show');
            overlay.classList.add('hide');
            changeCard(currentQuestion);
            checkFinish(currentQuestion, countRight, currentScore);
          });
        } else {
          overlay.classList.remove('hide');
          overlay.classList.add('show');
          const wrongAnswer = new Answer(false, this.answersByCategory()[currentQuestion]);
          overlay.innerHTML = wrongAnswer.render();
          wrongAnswer.after_render();
          audio.src = playList[1].src;
          audio.play();
          const next = document.querySelector('.modal__btn-answer');
          currentScore[currentQuestion] = false;
          next.addEventListener('click', () => {
            overlay.classList.remove('show');
            overlay.classList.add('hide');
            changeCard(currentQuestion);
            checkFinish(currentQuestion, countRight, currentScore);
          });
        }
        currentQuestion++;
      });
    });
  }
}

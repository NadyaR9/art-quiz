import { playList } from '../../utils/playList';
import { TOTAL_QUESTION } from '../../utils/consts';

export class Modal {
  constructor(right = -1) {
    this.right = right;
    if (this.right !== -1) {
      if (this.right === TOTAL_QUESTION) {
        this.message = `<div class="result result_great"></div>
                        <h2 id="modal-header" class="title title_great">Превосходно</h2> 
                        <p id="modal-content" class="subtitle subtitle_great">Поздравляем!</p>
                      `;
        this.btns = `
                    <a href="#/"><button class="btn btn_150px stop-audio">Главная</button></a>
                    <a href="#/questionsbyartist" class="next-quiz"><button class="btn btn_150px ">Следующий раунд</button></a>
                `;
      } else if (this.right > 5) {
        this.message = `<div class="result result_pass"></div>
                        <h2 id="modal-header" class="title title_pass">Поздравляем!</h2>  
                        <p id="modal-content" class="subtitle subtitle_pass">${this.right} / 10</p> 
                      `;
        this.btns = `
                    <a href="#/"><button class="btn btn_150px stop-audio">Главная</button></a>
                    <a href="#/questionsbyartist" class="next-quiz"><button class="btn btn_150px">Следующий раунд</button></a>
                `;
      } else {
        this.message = `<div class="result result_fail"></div>
                        <h2 id="modal-header" class="title title_fail">Игра окончена</h2> 
                        <p id="modal-content" class="subtitle subtitle_fail">Сыграть снова?</p>
                      `;
        this.btns = `
                    <a href="#/"><button class="btn btn_150px stop-audio">Нет</button></a>
                    <a href="#/questionsbyartist"><button class="btn btn_150px stop-audio">Да</button></a>
                `;
      }
    } else {
      this.message = '<h2 id="modal-header" class="quit">Вы действительно хотите прекратить игру?</h2>';
      this.btns = `
                <button class="btn btn_150px back-quiz">Нет</button>
                <a href="#/"><button class="btn btn_150px">Да</button></a>
            `;
    }
  }

  render() {
    return `
        <dialog id="dialog" aria-labeledby="modal-header" aria-describedby="modal-content" class="modal modal_result">
          <button class="close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
              d="M9.64493 7.99989L14.6616 2.99489C14.8813 2.7752 15.0047 2.47724 15.0047 2.16656C15.0047 1.85587 14.8813 1.55791 14.6616 1.33822C14.4419 1.11854 14.1439 0.995117 13.8333 0.995117C13.5226 0.995117 13.2246 1.11854 13.0049 1.33822L7.99993 6.35489L2.99493 1.33822C2.77524 1.11854 2.47728 0.995117 2.1666 0.995117C1.85591 0.995117 1.55795 1.11854 1.33826 1.33822C1.11857 1.55791 0.995155 1.85587 0.995155 2.16656C0.995155 2.47724 1.11857 2.7752 1.33826 2.99489L6.35493 7.99989L1.33826 13.0049C1.22891 13.1133 1.14212 13.2424 1.08289 13.3845C1.02366 13.5267 0.993164 13.6792 0.993164 13.8332C0.993164 13.9872 1.02366 14.1397 1.08289 14.2819C1.14212 14.4241 1.22891 14.5531 1.33826 14.6616C1.44672 14.7709 1.57575 14.8577 1.71792 14.9169C1.86009 14.9762 2.01258 15.0067 2.1666 15.0067C2.32061 15.0067 2.4731 14.9762 2.61527 14.9169C2.75744 14.8577 2.88647 14.7709 2.99493 14.6616L7.99993 9.64489L13.0049 14.6616C13.1134 14.7709 13.2424 14.8577 13.3846 14.9169C13.5268 14.9762 13.6792 15.0067 13.8333 15.0067C13.9873 15.0067 14.1398 14.9762 14.2819 14.9169C14.4241 14.8577 14.5531 14.7709 14.6616 14.6616C14.7709 14.5531 14.8577 14.4241 14.917 14.2819C14.9762 14.1397 15.0067 13.9872 15.0067 13.8332C15.0067 13.6792 14.9762 13.5267 14.917 13.3845C14.8577 13.2424 14.7709 13.1133 14.6616 13.0049L9.64493 7.99989Z" />
            </svg>
          </button>                
            ${this.message}               
          <div class="btns">
            ${this.btns}
          </div>
        </dialog>
    `;
  }

  after_render() {
    const dialog = document.querySelector('#dialog');
    dialog.show();
    const btns = document.querySelectorAll('button');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        dialog.close();
      });
    });
    const audio = new Audio();
    if (this.right > 5 && this.right <= TOTAL_QUESTION) {
      audio.src = playList[2].src;
      audio.play();
    } else if (this.right >= 0 && this.right <= 5) {
      audio.src = playList[3].src;
      audio.play();
    }
    const stopAudio = document.querySelectorAll('.stop-audio');
    const close = document.querySelector('.close');
    const overlay = document.querySelector('.overlay');
    const backToQuiz = () => {
      overlay.classList.remove('show');
      overlay.classList.add('hide');
    };
    close.addEventListener('click', backToQuiz);
    if (this.right === -1) {
      const backQuiz = document.querySelector('.back-quiz');
      backQuiz.addEventListener('click', backToQuiz);
    } else {
      const nextQuiz = document.querySelectorAll('.next-quiz');
      nextQuiz.forEach((item) => {
        item.addEventListener('click', () => {
          let currentCategories = sessionStorage.getItem('categoryIndex');
          sessionStorage.setItem('categoryIndex', ++currentCategories);
          window.dispatchEvent(new HashChangeEvent('hashchange'));
          audio.pause();
        });
      });
      stopAudio.forEach((item) => {
        item.addEventListener('click', () => {
          audio.pause();
        });
      });
    }
  }
}

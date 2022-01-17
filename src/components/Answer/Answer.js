export class Answer {
  constructor(flag, answers) {
    this.flag = flag;
    this.author = answers.author;
    this.year = answers.year;
    this.name = answers.name;
    this.src = `./../assets/data/img/${answers.imageNum}.jpg`;
    this.alt = answers.name;
  }

  setStatus() {
    if (this.flag) {
      return '<div class="status status_right"></div>';
    }
    return '<div class="status status_wrong"></div>';
  }

  render() {
    return `
        <div class="overlay">
          <dialog id="dialog" class="modal modal_answer">                   
            <figure class="picture">
                <img src="${this.src}" alt=${this.alt}>
                ${this.setStatus()}
            </figure>
            <h3 class="name">${this.name} </h3>
            <h4 class="author">${this.author}, ${this.year}</h4>
            <button class="btn btn_150px modal__btn-answer">Next</button>
          </dialog>
        </div>
      `;
  }

  after_render() {
    const dialog = document.querySelector('#dialog');
    dialog.show();
    const btns = document.querySelector('button');
    btns.addEventListener('click', () => {
      dialog.close();
    });
  }
}

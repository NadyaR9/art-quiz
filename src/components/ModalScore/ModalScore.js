export class ModalScore {
  constructor(answers) {
    this.author = answers.author;
    this.year = answers.year;
    this.name = answers.name;
    this.src = `./../assets/data/img/${answers.imageNum}.jpg`;
    this.alt = answers.name;
  }

  render() {
    return `
      <dialog id="dialog" aria-labeledby="modal-header" class="modal modal_answer">                   
        <figure class="picture">
            <img src="${this.src}" alt=${this.alt}>
        </figu>
        <h2 id="modal-header" class="name">${this.name} </h2>
        <div class="author">${this.author}, ${this.year}</div>
        <button class="btn btn_150px modal__btn-answer">Ok</button>
      </dialog>
    `;
  }

  after_render() {
    const dialog = document.querySelector('#dialog');
    const overlay = document.querySelector('.overlay');
    dialog.show();
    const close = document.querySelector('.modal__btn-answer');
    close.addEventListener('click', () => {
      dialog.close();
      overlay.classList.remove('show');
      overlay.classList.add('hide');
    });
  }
}

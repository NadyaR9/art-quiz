export class PictureCard {
  constructor(author, imageNum, questions) {
    this.author = author;
    this.imageNum = imageNum;
    this.questions = questions;
  }

  renderCards() {
    const resultTemplate = [];
    const formSrc = [];
    for (let i = 0; i < this.questions.length; i++) {
      formSrc.push(this.questions[i].imageNum);
    }
    formSrc.forEach((src) => {
      if (this.imageNum === src) {
        resultTemplate.push(`
          <figure class="picture__item" data-imagenum="${this.imageNum}">
            <img src="../assets/data/img/${this.imageNum}.jpg" alt="${this.author}">
          </figure>
        `);
      } else {
        resultTemplate.push(`
          <figure class="picture__item">
            <img src="../assets/data/img/${src}.jpg" alt="${this.author}">
          </figure>
        `);
      }
    });
    return resultTemplate.join('');
  }

  render() {
    return `
      <section class="picture__question"><h4 class="question">Какую из картин написал ${this.author}?</h4>  
        <article class="picture__list">
          ${this.renderCards()}
        </article>
      </section>
    `;
  }

  after_render() {}
}

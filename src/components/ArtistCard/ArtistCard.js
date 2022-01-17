export class ArtistCard {
  constructor(author, imageNum, questions) {
    this.author = author;
    this.src = `./../assets/data/img/${imageNum}.jpg`;
    this.alt = author;
    this.questions = questions;
  }

  renderBtn() {
    const resultTemplate = [];
    for (const question of this.questions) {
      resultTemplate.push(`
        <button class="btn btn_158px btn_question">${question}</button>
      `);
    }
    return resultTemplate.join('');
  }

  render() {
    return `
      <article class="artist__item">
        <figure class="artist__picture">
          <img src="${this.src}" alt=${this.alt}>
        </figure>
        <div class="artist__answers">
          ${this.renderBtn()}
        </div>
      </article>
      `;
  }

  after_render() {}
}

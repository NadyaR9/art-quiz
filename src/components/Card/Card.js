export class Card {
  constructor(src, alt, title, score, href, dataset) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.score = score;
    this.href = href;
    this.dataset = dataset;
  }

  template() {
    return `
      <article class="category__card card" data-category="${this.dataset}">
        <div class="card__header">
          <h5 class="card__title">${this.title}</h5>
          <a href="#/score">
            <div class="card__score">${this.score}</div>
          </a>
        </div>
        <a href="#/${this.href}">
          <figure class="card__img">
            <img src="${this.src}" alt="${this.alt}">
          </figure> 
        </a>
      </article>
    `;
  }
}

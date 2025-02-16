export default class Loader {
  constructor(block, percent = 55) {
    if (!block) return;
    this.loader = block;
    this.percent = percent;

    block.insertAdjacentHTML(
      'beforeend',
      `
        <div class='loader__circle'>
          <div class='loader__circle_item loader__circle_empty'></div>
          <div class='loader__circle_item loader__circle_fill'></div>
          <div class='loader__circle_item loader__circle_percent'></div>
        </div>
      `
    );

    this.loaderCircle = block.querySelector('.loader__circle');
    this.percentLoader = this.loaderCircle.querySelector('.loader__circle_percent');
    this.changePercentBlock();

    return this;
  }

  getPercent() {
    return this.percent;
  }

  setPercent(percent) {
    this.percent = percent;
  }

  changePercentBlock() {
    if (!this.percentLoader) return;

    let filled = (360 / 100) * this.percent;
    
    if (this.percent < 50)
      this.changePercentBlockStyle(filled, 'empty')
    else
      this.changePercentBlockStyle(filled - 180, 'fill');

    this.loader.dataset.percent = `${this.percent}%`;
  }

  changePercentBlockStyle(num, color) {
    this.percentLoader.style.webkitTransform = `rotate(${num}deg)`;
    this.percentLoader.style.msTransform = `rotate(${num}deg)`;
    this.percentLoader.style.MozTransform = `rotate(${num}deg)`;

    if (!this.percentLoader.classList.contains(color)) {
      this.percentLoader.classList.remove('empty', 'fill');
      this.percentLoader.classList.add(color);
    }
  }
  addAnimation() {
    this.loader.classList.add('animate');
  }
  removeAnimation() {
    this.loader.classList.remove('animate');
  }

  showLoader() {
    this.loader.classList.remove('hidden');
  }
  hiddenLoader() {
    this.loader.classList.add('hidden');
  }

  addTransition() {
    this.percentLoader.classList.remove('not-transition');
  }
  removeTransition() {
    this.percentLoader.classList.add('not-transition');
  }
}
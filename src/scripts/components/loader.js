export default class Loader {
  constructor(block, percent = 75) {
    if (!block) return;
    this.percent = percent;

    block.insertAdjacentHTML(
      'beforeend',
      `
        <div class='loader'>
          <div class='loader__circle'>
            <div class='loader__circle_item loader__circle_empty'></div>
            <div class='loader__circle_item loader__circle_fill'></div>
            <div class='loader__circle_item loader__circle_percent'></div>
          </div>
        </div>
      `
    );

    this.loader = block.querySelector('.loader');
    this.loaderCircle = block.querySelector('.loader__circle');
    this.percentLoader = this.loaderCircle.querySelector('.loader__circle_percent');
    this.updateLoader();

    return this;
  }

  getPercent() {
    return this.percent;
  }
  setPercent(percent) {
    this.percent = percent;
  }

  updateLoader() {
    if (!this.percentLoader) return;

    /* 
      Функция для изменения свойства transform и класс fill (для изменения цвета)
        элемента loader__circle_percent
      Принимает:
        - num (числовое значение) - новое значение свойства transform
        - fullness (булевое значение) - добавление (true) / удаление (false) класса fill
    */
    let changePercentBlockStyle = (num, fullness) => {
      this.percentLoader.style.webkitTransform = `rotate(${num}deg)`;
      this.percentLoader.style.msTransform = `rotate(${num}deg)`;
      this.percentLoader.style.MozTransform = `rotate(${num}deg)`;
  
      if (fullness)
        this.percentLoader.classList.add('fill');
      else
        this.percentLoader.classList.remove('fill');
    }

    let filled = (360 / 100) * this.percent;
    
    if (this.percent < 50)
      changePercentBlockStyle(filled, false);
    else
      changePercentBlockStyle(filled - 180, true);

    this.loader.dataset.percent = `${this.percent}%`;
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
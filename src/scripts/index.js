import Loader from "Scripts/components/loader";

import "Styles/style.sass";

document.addEventListener('DOMContentLoaded', function () {
  // Create loader
  const progressBlock = document.querySelector('.loader');
  let loader = new Loader(progressBlock);

  // Get default input and set value
  const input = document.querySelector('input[type="number"]');
  input.value = loader.getPercent();

  // Default input listeners
  input?.addEventListener('focus', (e) => {
    if (input.value === '0') 
      input.value = 'this.percent';
  });
  input?.addEventListener('input', (e) => {
    if (e.data?.match(/[e,+,-]/) || Number(input.value) > input.max || input.value === '0') 
      input.value = loader.getPercent() || '';
    else {
      loader.setPercent(input.value || 0);
      loader.changePercentBlock();
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown')
      loader.removeTransition();
    else
      loader.addTransition();
  });
  
  input?.addEventListener('blur', () => {
    if (input.value === '')
      input.value = 0;
  });

  const animateBtn = document.querySelector('input#animateBtn');
  animateBtn.addEventListener('click', () => {
    animateBtn.checked ? loader.addAnimation() : loader.removeAnimation();
  });

  const hideBtn = document.querySelector('input#hideBtn');
  hideBtn.addEventListener('click', () => {
    hideBtn.checked ? loader.hiddenLoader() : loader.showLoader();
  });
});
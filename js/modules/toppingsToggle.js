export const toppingsToggle = () => {
  const toppingsBtn =document.querySelector('.toppings__btn');
  const toppingsList =document.querySelector('.toppings__list');
  
  toppingsBtn.addEventListener('click', () => {
    if (!toppingsList.classList.contains('toppings__list_show')) {
      toppingsList.classList.add('toppings__list_show');
      toppingsBtn.classList.add('toppings__btn_active');
      toppingsList.style.maxHeight = `${toppingsList.scrollHeight}px`;
    } else {
      toppingsBtn.classList.remove('toppings__btn_active');
      toppingsList.style.maxHeight = null;
  
      setTimeout(() => {
        toppingsList.classList.remove('toppings__list_show');
      }, 360);
    }
  });
};
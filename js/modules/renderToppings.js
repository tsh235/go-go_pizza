import { toUpperCaseFirstLetter } from "./helper.js";
import { renderPizzas } from "./renderPizzas.js";
import { getData } from "./serviceApi.js";

export const renderToppings = async () => {
  const {en: enToppings, ru: ruToppings} = await getData('toppings');
  const toppingsList = document.querySelector('.toppings__list');
  toppingsList.textContent = '';

  const items = enToppings.map((data, i) => {
    const item = document.createElement('li');
    item.classList.add('toppings__item');

    item.insertAdjacentHTML('beforeend', `
      <input class="toppings__checkbox" type="checkbox" name="topping" id="${data}" value="${data}">
      <label class="toppings__label" for="${data}">${toUpperCaseFirstLetter(ruToppings[i])}</label>
    `);
    return item;
  });

  toppingsList.append(...items);

  const itemReset = document.createElement('li');
  itemReset.classList.add('toppings__item');

  const btnReset = document.createElement('button');
  btnReset.classList.add('toppings__reset');
  btnReset.textContent = 'Сбросить';
  btnReset.type = 'reset';

  itemReset.append(btnReset);

  const toppingsForm = document.querySelector('.toppings__form');

  toppingsForm.addEventListener('change', e => {
    const formData = new FormData(toppingsForm);
    const checkedToppings = [];
    for (const [, value] of formData.entries()) {
      checkedToppings.push(value);
    }
    
    if (checkedToppings.length) {
      toppingsList.append(itemReset);
    } else {
      itemReset.remove();
    }

    renderPizzas(checkedToppings);
  });

  btnReset.addEventListener('click', () => {
    toppingsForm.reset();
    itemReset.remove();
    renderPizzas();
  });
};
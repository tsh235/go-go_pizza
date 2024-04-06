import { cartControl } from './cartControl.js';
import { createLabel, createRadioInput, toUpperCaseFirstLetter } from './helper.js';

export const renderModalPizza = ({id, images, name, price, toppings}) => {
  const modalPizzaMain = document.querySelector('.modal-pizza__main');
  modalPizzaMain.textContent = '';

  let size = Object.keys(price)[0];
  
  const picture = document.createElement('picture');
  const source = document.createElement('source');
  source.srcset = images[1];
  source.type = 'image/webp';

  const img = document.createElement('img');
  img.classList.add('modal-pizza__img');
  img.src = images[0];
  img.alt = name.ru;
  img.width = '180';
  img.height = '180';
  
  picture.append(source, img);

  const title = document.createElement('h2');
  title.classList.add('modal-pizza__title');
  title.textContent = toUpperCaseFirstLetter(name.ru);

  const pizzaToppings = document.createElement('p');
  pizzaToppings.classList.add('modal-pizza__toppings');
  pizzaToppings.textContent = toUpperCaseFirstLetter(toppings.ru);

  const info = document.createElement('p');
  info.classList.add('modal-pizza__info');

  const pizzaPrice = document.createElement('span');
  pizzaPrice.classList.add('modal-pizza__price');
  const separator = document.createElement('span');
  separator.textContent = '/';
  const pizzaSize = document.createElement('span');
  pizzaSize.classList.add('modal-pizza__size');

  info.append(pizzaPrice, separator, pizzaSize);

  const updatePrice = () => {
    const checkedSizeInput = form.querySelector('input[name="size"]:checked');
    size = checkedSizeInput.value;
    pizzaPrice.textContent = `${price[size]} ₽`
    pizzaSize.textContent = `${parseInt(size)} см`
  };

  const form = document.createElement('form');
  form.classList.add('modal-pizza__form');
  form.id = id;

  const crustFieldset = document.createElement('fieldset');
  crustFieldset.classList.add('modal-pizza__fieldset');

  const thickInput = createRadioInput('modal-pizza__radio', 'thick', 'crust', 'thick');
  const thickLabel = createLabel('modal-pizza__label', 'thick', 'Пышное тесто');

  const thinInput = createRadioInput('modal-pizza__radio', 'thin', 'crust', 'thin');
  const thinLabel = createLabel('modal-pizza__label', 'thin', 'Тонкое тесто');
  thinInput.checked = true;

  crustFieldset.append(thickInput, thickLabel, thinInput, thinLabel);

  const sizeFieldset = document.createElement('fieldset');
  sizeFieldset.classList.add('modal-pizza__fieldset');

  const sizeInputs = Object.keys(price).map(size => createRadioInput('modal-pizza__radio', size, 'size', size));
  sizeInputs[0].checked = true;

  sizeInputs.forEach(input => {
    const label = createLabel('modal-pizza__label', input.id, `${parseInt(input.value)} см`);
    input.addEventListener('change', updatePrice);
    sizeFieldset.append(input, label);
  });

  const addToCartBtn = document.createElement('button');
  addToCartBtn.classList.add('modal-pizza__add-cart');
  addToCartBtn.textContent = 'В корзину';

  form.append(crustFieldset, sizeFieldset, addToCartBtn);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('modal__close');
  closeBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14.8333" y="4" width="0.851136" height="15.3204" transform="rotate(45 14.8333 4)" fill="currentColor"/>
      <rect x="4" y="4.60184" width="0.851136" height="15.3204" transform="rotate(-45 4 4.60184)" fill="currentColor"/>
    </svg>
  `;

  modalPizzaMain.append(picture, title, pizzaToppings, info, form, closeBtn);

  updatePrice();

  let timerId = NaN;
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const product = {
      cartId: crypto.randomUUID(),
      id,
      crust: formData.get('crust'),
      size: formData.get('size'),
    }

    cartControl.addCart(product);

    addToCartBtn.disabled = true;
    addToCartBtn.textContent = 'Добавлено';

    timerId = setTimeout(() => {
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = 'В корзину';
    }, 3000);
  });

  form.addEventListener('change', () => {
    clearTimeout(timerId);
    addToCartBtn.disabled = false;
    addToCartBtn.textContent = 'В корзину';
  });
};
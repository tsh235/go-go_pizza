import { modalController } from './modules/modalController.js';
import { modalCartController } from './modules/modalCartController.js';
import { renderPizzas } from './modules/renderPizzas.js';
import { renderToppings } from './modules/renderToppings.js';
import { toppingsToggle } from './modules/toppingsToggle.js';

export const API_URL = 'https://picayune-tortoiseshell-trout.glitch.me/api';

const init = () => {
  toppingsToggle();
  renderToppings();
  renderPizzas();
  modalController({
    modal: '.modal-cart',
    btnOpen: '.header__cart',
    btnClose: '.modal__close',
    cbOpen() {
      modalCartController();
    }
  });
};

init();
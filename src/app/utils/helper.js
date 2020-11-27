import { ESC_KEYCODE } from '../const/common';

export const isEscKeyPressed = (evt) => evt && evt.which === ESC_KEYCODE;
export const safeGetElement = (selector, node = document) => {
  if (!node) {
    throw new ArgumentError();
  }

  const element = node.querySelector(selector);
  if (!element) {
    throw new NotFoundBySelectorError(selector);
  }

  return element;
};

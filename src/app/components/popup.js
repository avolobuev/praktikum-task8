import { isEscKeyPressed, safeGetElement } from '../utils/helper';
import { popUpCloseButtonSelector } from '../const/selectors';

export class PopUp {
  constructor(popUpSelector) {
    this._element = safeGetElement(popUpSelector);
    this._closeElement = safeGetElement(popUpCloseButtonSelector, this._element);
    this._openClass = `popup_is-opened`;
  }

  open(params) {
    this._setFields(params);
    this._element.classList.add(this._openClass);
    this.setEventListeners();
  }

  _setFields(params) {}

  close() {
    this._element.classList.remove(this._openClass);
    this._resetFields();
    this.resetEventListeners();
  }

  _resetFields() {}

  setEventListeners() {
    this._closeElement.addEventListener('click', () => this.close());
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
  }

  resetEventListeners() {
    this._closeElement.removeEventListener('click', () => this.close());
    document.removeEventListener('keyup', (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    evt.preventDefault();
    if (isEscKeyPressed(evt)) {
      this.close();
    }
  }
}

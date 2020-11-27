import { safeGetElement } from '../utils/helper';

export class Card {
  constructor({ data, cardTemplateSelector, handleCardClick }) {
    this._text = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getTemplate() {
    const cardElement = safeGetElement(this._cardTemplateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    safeGetElement('.card__like-button', this._element)
      .addEventListener('click', (evt) => {
        evt.stopPropagation();
        this._handleLikeIcon();
      });

    safeGetElement('.card__delete-button', this._element)
      .addEventListener('click', (evt) => {
        evt.stopPropagation();
        this._handleDeleteCard()
      });

    safeGetElement('.card__image', this._element)
      .addEventListener('click', this._handleCardClick);
  }

  _handleLikeIcon() {
    safeGetElement('.card__like-button', this._element)
      .classList.toggle('card__like-button_is-active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();

    safeGetElement('.card__image', this._element).style.backgroundImage = `url(${this._link})`;
    safeGetElement('.card__title', this._element).textContent = this._text;

    return this._element;
  }
}

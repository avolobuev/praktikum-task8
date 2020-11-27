import { PopUp } from './popup';
import { safeGetElement } from '../utils/helper';
import { popUpImageElementSelector, popUpImageCaptionSelector } from '../const/selectors';

export class PopUpWithImage extends PopUp {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = safeGetElement(popUpImageElementSelector, this._element);
    this._imageCaptionElement = safeGetElement(popUpImageCaptionSelector, this._element);
  }

  _setFields({ imagePath, imageDescription }) {
      this._imageElement.src = imagePath;
      this._imageElement.alt = `Изображение ${imagePath}`;
      this._imageCaptionElement.textContent = imageDescription;
  }

  _resetFields() {
    this._imageElement.src = '';
    this._imageElement.alt = '';
    this._imageCaptionElement.textContent = '';
  }
}

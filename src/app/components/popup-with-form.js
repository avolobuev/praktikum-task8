import { PopUp } from './popup';
import { FormValidator } from './form-validator';
import { safeGetElement } from '../utils/helper';
import { defaultFormConfig } from '../const/default-form-config'

export class PopUpWithForm extends PopUp {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);

    this._form = safeGetElement(defaultFormConfig.formSelector, this._element);
    this._formSubmitCallback = formSubmitCallback;
    this._formValidator = new FormValidator(defaultFormConfig, this._element);
  }

  _setFields(params) {
    if (!!params) {
      const fieldKeys = Object.keys(params);
      if (fieldKeys.length > 0) {
        fieldKeys.forEach(key => {
          const inputElement = safeGetElement(`input[name='${key}']`, this._form);
          inputElement.value = params[key];
        });
      }
    }
  }

  _resetFields() {
    this._form.reset();
  }

  _getInputFields() {
    return this._form.elements;
  }

  _submitForm(evt) {
    this._formSubmitCallback(evt, this._getInputFields());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formValidator.enableValidation();

    safeGetElement(defaultFormConfig.formSelector, this._element)
      .addEventListener('submit', (evt) => this._submitForm(evt));
  }

  resetEventListeners() {
    super.setEventListeners();

    safeGetElement(defaultFormConfig.formSelector)
      .removeEventListener('submit', (evt) => this._submitForm(evt));
  }
}

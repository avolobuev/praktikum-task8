import { safeGetElement } from '../utils/helper';

export class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameElement = safeGetElement(userNameSelector);
    this._userDescriptionElement = safeGetElement(userDescriptionSelector);
  }

  getUserInfo() {    
    return {
      name: this._userNameElement.textContent,
      description: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo({ userName, userDescription}) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
  }
}

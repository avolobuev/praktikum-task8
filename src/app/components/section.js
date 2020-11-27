import { safeGetElement } from '../utils/helper'

export class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = safeGetElement(containerSelector);
    }
  
    addItem(element) {
      this._container.append(element);
    }
  
    renderItems() {
      this._renderedItems.forEach(item => this._renderer(item));
    }
}

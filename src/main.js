import './styles/index.css';
import { safeGetElement, Factory } from './app/utils';
import { Section } from './app/components';
import { initialCards } from './app/const/initial-cards';
import { addNewPlaceHandler, editProfileHandler } from './app/event-handlers';

import * as selectors from './app/const/selectors';

try {
  const placesList = new Section({
    items: initialCards,
    renderer: (data) => {
      const card = Factory.createPlaceCard(data);
      placesList.addItem(card.getView());
    }
  }, selectors.placesListContainerSelector);
  
  safeGetElement(selectors.profileEditButtonSelector)
    .addEventListener('click', () => editProfileHandler());
  
  safeGetElement(selectors.addNewCardButtonSelector)
    .addEventListener('click', () => addNewPlaceHandler(placesList));
  
  placesList.renderItems();
} catch(error) {
  console.log(error);
}

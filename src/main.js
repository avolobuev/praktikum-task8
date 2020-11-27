import './styles/index.css';

import { safeGetElement } from './app/utils/helper';
import { Section, Card, PopUpWithImage, PopUpWithForm } from './app/components';
import { initialCards } from './app/const/initial-cards';
import { UserInfo } from './app/components/user-info';

import * as selectors from './app/const/selectors';

const placesList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card({
      data, 
      cardTemplateSelector: selectors.cardTemplateSelector,
      handleCardClick: () => {
        const popUpImage = new PopUpWithImage(selectors.popUpWithImageSelector);
        const { link: imagePath, name: imageDescription } = data;
        popUpImage.open({ imagePath, imageDescription });
      }
    });
    
    placesList.addItem(card.getView());
  }
}, selectors.placesListContainerSelector);

safeGetElement(selectors.profileEditButtonSelector)
  .addEventListener('click', () => {
    const userInfo = new UserInfo({
      userNameSelector: selectors.profileUserNameSelector,
      userDescriptionSelector: selectors.profileUserDescriptionSelector,
    });
    const popUp = new PopUpWithForm(
      selectors.profilePopUpEditSelector, 
      (submitEvent, formElements) => {
        submitEvent.preventDefault();

        userInfo.setUserInfo({
          userName: formElements.name.value,
          userDescription: formElements.description.value,
        });

        popUp.close();
      }
    );
    
    popUp.open(userInfo.getUserInfo());
  });

safeGetElement(selectors.addNewCardButtonSelector)
  .addEventListener('click', () => {
    const popUp = new PopUpWithForm(
      selectors.newPlacePopUpSelector, 
      (submitEvent, formElements) => {
        submitEvent.preventDefault();

        const data = { 
          name: formElements['place-name'].value,
          link: formElements['place-link'].value
        };
        const newCard = new Card({
          data, 
          cardTemplateSelector: selectors.cardTemplateSelector,
          handleCardClick: () => {
            const popUpImage = new PopUpWithImage(selectors.popUpWithImageSelector);
            const { link: imagePath, name: imageDescription } = data;
            popUpImage.open({ imagePath, imageDescription });
          }
        });
        placesList.addItem(newCard.getView());

        popUp.close();
      }
    );
    popUp.open();
  });

placesList.renderItems();

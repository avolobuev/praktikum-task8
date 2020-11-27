import { Card, PopUpWithImage, PopUpWithForm } from '../components';
import { ArgumentError } from '../errors';
import * as selectors from '../const/selectors';

export const addNewPlaceHandler = (placesContainer) => {
    const popUp = new PopUpWithForm(
        selectors.newPlacePopUpSelector, 
        (submitEvent, formElements) => {
            submitEvent.preventDefault();
            submitEvent.stopImmediatePropagation();

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

            if (!placesContainer) throw new ArgumentError();
            placesContainer.addItem(newCard.getView());
            popUp.close();
        }
    );
    popUp.open();
}
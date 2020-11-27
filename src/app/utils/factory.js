import { Card, PopUpWithImage } from '../components';
import * as selectors from '../const/selectors';

export class Factory {
    static createPlaceCard(data) {
        return new Card({
            data, 
            cardTemplateSelector: selectors.cardTemplateSelector,
            handleCardClick: () => {
                const popUpImage = new PopUpWithImage(selectors.popUpWithImageSelector);
                const { link: imagePath, name: imageDescription } = data;
                popUpImage.open({ imagePath, imageDescription });
            }
        });
    }
}

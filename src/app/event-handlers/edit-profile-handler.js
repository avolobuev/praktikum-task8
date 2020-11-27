import { PopUpWithForm, UserInfo } from '../components';
import { ArgumentError } from '../errors';
import * as selectors from '../const/selectors';

export const editProfileHandler = () => {
    const userInfo = new UserInfo({
        userNameSelector: selectors.profileUserNameSelector,
        userDescriptionSelector: selectors.profileUserDescriptionSelector,
    });

    const popUp = new PopUpWithForm(
        selectors.profilePopUpEditSelector, 
        (submitEvent, formElements) => {
            submitEvent.preventDefault();
            submitEvent.stopImmediatePropagation();

            if (!formElements || !formElements.name || !formElements.description)
                throw new ArgumentError();

            userInfo.setUserInfo({
                userName: formElements.name.value,
                userDescription: formElements.description.value,
            });

            popUp.close();
        }
    );

    popUp.open(userInfo.getUserInfo());
}
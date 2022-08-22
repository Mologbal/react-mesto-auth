import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditProfilePopup(
    {open, close, onUpdateUser, onOverlayClose, onButtonEsc}
) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({name: name, about: about});
    };

    function handleAboutChange(e) {
        setAbout(e.target.value);
    };

    function handleNameChange(e) {
        setName(e.target.value);
    };

    //сохранит введенные данные при повторном открытии попапа-профиля
    React.useEffect(() => {
        if (open) {
            setName(currentUser.name);
            setAbout(currentUser.about);
        }
    }, [open, currentUser]);

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            open={open}
            close={close}
            buttonText='Сохранить'
            onSubmit={handleSubmit}
            onOverlayClose={onOverlayClose}
            onButtonEsc={onButtonEsc}>
            <input
                className="popup__placeholder-input popup__placeholder-input_type_name"
                value={name}
                onChange={handleNameChange}
                id="name"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required="required"/>
            <span id="error-name" className="popup__error"></span>
            <input
                className="popup__placeholder-input popup__placeholder-input_type_passion"
                value={about}
                onChange={handleAboutChange}
                id="passion"
                type="text"
                name="about"
                placeholder="Профессиональная деятельность"
                minLength="2"
                maxLength="200"
                required="required"/>
            <span id="error-passion" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
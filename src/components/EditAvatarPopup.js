import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({open, close, onSubmit, onOverlayClose, onButtonEsc}) {
    const ref = React.useRef();

    function handleSubmit(e) {
        e.preventDefault()

        onSubmit({
            avatar: ref.current.value
        })
    }

   //очистит поле ввода ссылочки на аватар, на случай если она уже заполнена
    React.useEffect(() => {
        ref.current.value = ''
    }, [open])




    return (
        <PopupWithForm
                    name='avatar'
                    title='Обновить аватар'
                    open={open}
                    close={close}
                    onSubmit={handleSubmit}
                    buttonText = 'Сохранить'
                    onOverlayClose={onOverlayClose}
                    onButtonEsc={onButtonEsc}
                    >
                    <input
                    ref={ref}
                    className="popup__placeholder-input popup__placeholder-input_type_passion"
                    id="avatar"
                    type="url"
                    placeholder="Ссылка на картинку"
                    name="avatar"
                    required="required"/>
                <span id="error-avatar" className="popup__error"></span>
            </PopupWithForm>
    )
}

export default EditAvatarPopup;
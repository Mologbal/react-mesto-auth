import React from "react";

function PopupWithForm({
    children,
    open,
    onButtonEsc,
    name,
    onOverlayClose,
    close,
    onSubmit,
    title,
    buttonText
}) {
    let PopupOpen = open
        ? 'popup_enable'
        : ``;

    //закроет попапы по нажатию на Esc
    React.useEffect(() => {
        if (open) {
            document.addEventListener('keydown', onButtonEsc)
            return() => {
                document.removeEventListener('keydown', onButtonEsc);
            }
        }
    }, [open])

    return (
        <div
            className={`popup ${PopupOpen}`}
            onClick={onOverlayClose}
            id={`popup-${name}`}>
            <div className="popup__window">
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={close}></button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__placeholder" name="popup__form" onSubmit={onSubmit}>
                    {children}
                    <button className="popup__save-button" type="submit" aria-label="Сохранить">{buttonText}</button>
                </form>
            </div>
            <div className="popup__overlay"></div>
        </div>
    )
}

export default PopupWithForm;
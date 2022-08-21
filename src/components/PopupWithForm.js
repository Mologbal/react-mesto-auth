function PopupWithForm(props) {
    let PopupOpen = props.open ? 'popup_enable': ``;
    return (
        <div className={`popup ${PopupOpen}`} onClick={props.onOverlayClose} id={`popup-${props.name}`}>               
        <div className="popup__window">
            <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.close}></button>
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__placeholder" name="popup__form" onSubmit={props.onSubmit}>
            {props.children}
                <button className="popup__save-button" id="saveProfile" type="submit"
                    aria-label="Сохранить">{props.buttonText}</button>
            </form>
        </div>
        <div className="popup__overlay"></div>
    </div>
    )
}

export default PopupWithForm;
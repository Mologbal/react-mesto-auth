import React from "react";

function ImagePopup({card, onClose, onOverlayClose, onButtonEsc}) {

    React.useEffect(() => {
        if (card) {
            document.addEventListener('keydown', onButtonEsc)
            return () => {
                document.removeEventListener('keydown', onButtonEsc);
              }
        }
    }, [card])

    return (
        <div className={`popup popup_approximation ${card && 'popup_enable'}`} onClick={onOverlayClose}id="popup-approximation">
        <div className="popup__image-container">
            <button className="popup__close-button popup__close-button_ap" id="popup-approximation-close-button"
                type="button" aria-label="Закрыть" onClick={onClose}/>
            <img className="popup__image" src={card?.link}
                alt={card?.name}/>
            <p className="popup__image-title">{card?.name}</p>
        </div>
        <div className="popup__overlay"></div>
    </div>
    )
}

export default ImagePopup
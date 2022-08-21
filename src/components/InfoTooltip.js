import React from "react";
import decline from '../images/decline.svg'
import accept from '../images/Union1.svg'

function InfoTooltip(props) {

    //TODO доверстать этот попап для мобильных устройств

    React.useEffect(() => {
        if (props.open) {
            document.addEventListener('keydown', props.onButtonEsc)
            return() => {
                document.removeEventListener('keydown', props.onButtonEsc);
            }
        }
    }, [props.open])

    return (
        <div
            onClick={props.onOverlayClose}
            className={`popup popup__info ${props.open
                ? 'popup_enable'
                : ''}`}>
            <div className='popup__container'>
                <button type='button' className='popup__close-button' onClick={props.close}></button>
                <div className='popup__form'>
                    <img
                        className='popup__reply-img'
                        src={props.isSuccess
                            ? accept
                            : decline}
                        alt={props.isSuccess
                            ? 'Всё прошло хорошо'
                            : 'Допущена ошибка!'}/>
                    <h2 className='popup__reply'>
                        {
                            props.isSuccess
                                ? "Вы успешно зарегистрировались!"
                                : "Что-то пошло не так! Попробуйте ещё раз."
                        }
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip
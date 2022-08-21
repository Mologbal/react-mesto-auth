import React from "react";
import { flushSync } from "react-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
    const cardDeleteButtonClassName = (`elements__delete-button ${isOwn ? 'elements__delete-button_active' : ''}`); 

    const isLiked = card.likes.some(i => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const cardLikeButtonClassName = (`elements__element-like ${isLiked ? 'elements__element-like_activated' : ''}`);


    function handleClick() {
        onCardClick(card);
    }
    
    function handleLikeClick() {
        onCardLike(card)
    }

    function handleCardDelete() {
        onCardDelete(card)
    }

    return(
        <li className="elements__element">
            <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}></button>
            <img className="elements__element-image" src={card.link}
                alt={card.name} onClick={handleClick}/>
            <div className="elements__element-box">
                <h2 className="elements__element-subtitle">{card.name}</h2>
                <div className="elements__element-likes-box">
                <button className={cardLikeButtonClassName} type="button" aria-label="Понравилось" onClick={handleLikeClick}></button>
                <span className="elements__element-like-length">{card.likes.length}</span>
            </div>
            </div>
        </li>
    )
}

export default Card;
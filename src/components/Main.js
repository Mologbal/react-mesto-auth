import {useEffect, useState, useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    
    return (
        <main className="main">

        <section className="profile">
            <div className="profile__box">
                <div className="profile__edit-box">
                    <img className="profile__avatar profile__avatar_overlay" src={currentUser.avatar}
                        alt="аватарка" />
                    <button className="profile__editAva-button" type="button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__info-name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="Изменить" onClick={props.onEditProfile}></button>
                    <p className="profile__info-passion">{currentUser.about}</p>
                </div>
            </div>
            <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
        </section>

        <section className="elements-container">
            <ul className="elements">
            {props.card.map((cards) =>(
                <Card
                card={cards}
                key={cards._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                onZoomClick={props.onZoomClick}
                likes={cards.likes.length}
                />
            ))} 
            </ul>
        </section>

    </main>
    )
}

export default Main;
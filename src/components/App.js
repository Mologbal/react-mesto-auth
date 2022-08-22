import {useState, useEffect, useCallback} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {apiConfig} from '../utils/Api';
import EditProfilePopup from './EditProfilePopup ';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {Route, Switch, useNavigate, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/hello'
import InfoTooltip from './InfoTooltip';

function App() {
    const [isEditProfilePopupOpen, toggleEditProfilePopup] = useState(false);
    const [isAddPlacePopupOpen, toggleAddPlacePopup] = useState(false);
    const [isEditAvatarPopupOpen, toggleEditAvatarPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null)
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [loggedIn, setLoggedIn] = useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const history = useHistory()

    //Функция для регистрации пользователя
    function handleRegister(email, password) {
        auth
            .register(email, password)
            .then(() => {
                setIsSuccess(true);
                history.push('/sign-in');
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
                setIsSuccess(false)
            })
            . finally(() => {
                setIsInfoTooltipOpen(true)
            })
    }

    // Функция для авторизации уже зарегистрированных пользователей(ещё сохранит
    // токен в локальное хранилище)
    function handleLogin(email, password) {
        auth
            .authorise(email, password)
            .then((res) => {
                localStorage.setItem('token', res.token)
                setLoggedIn(true);
                setUserEmail(email);
                history.push('/');
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
                setIsInfoTooltipOpen(true)
            })
        }

    //Функция для выхода из своего профиля
    function handleSignOut() {
        localStorage.removeItem('token')
        setLoggedIn(false);
        history.push('/sign-in')
    }

    //Проверит есть ли токен, и подставит email
    const handleCheckToken = useCallback(() => {
        auth
            .checkToken(localStorage.getItem('token'))
            .then((res) => {
                setLoggedIn(true);
                setUserEmail(res.data.email);
                history.push('/')
            })
            .catch((err) => {
                console.log(err)
                setLoggedIn(false)
            })
        }, [history])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            handleCheckToken();
        }
    }, [handleCheckToken])

    //отрисовка информации о пользователе и карточках с сервера
    useEffect(() => {
        if (loggedIn) {
            apiConfig
                .getUserInfo()
                .then((res) => {
                    setCurrentUser(res)
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`)
                })
            apiConfig
                .getInitialCards()
                .then((res) => {
                    setCards(res)
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`)
                })
            }
    }, [loggedIn]);

    function handleCardLike(card) {
        // проверим на предмет лайка от пользователя ранее
        const isLiked = card
            .likes
            .some(i => i._id === currentUser._id);

        //запрос на сервер за лайком/снятием лайка
        if (!isLiked) {
            apiConfig
                .setLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map(
                        (c) => c._id === card._id
                            ? newCard
                            : c
                    ));
                })
                .catch((error) => {
                    console.log(`Ошибка: ${error}`)
                })
            } else {
            apiConfig
                .deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map(
                        (c) => c._id === card._id
                            ? newCard
                            : c
                    ));
                })
                .catch((error) => {
                    console.log(`Ошибка: ${error}`)
                })
            }
    }

    // открывашки попапов
    function handleEditProfileClick() {
        toggleEditProfilePopup(true);
    }
    function handleAddPlaceClick() {
        toggleAddPlacePopup(true);
    }
    function handleEditAvatarClick() {
        toggleEditAvatarPopup(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card)
    }

    //закроет все попапы
    function closeAllPopups() {
        toggleEditProfilePopup(false);
        toggleAddPlacePopup(false);
        toggleEditAvatarPopup(false);
        setSelectedCard(null);
        setIsInfoTooltipOpen(false);
    }

    // *фун-я обработчик для эффектов в попапах(передаётся пропсом)
    function handleEscButton(e) {
        if (e.key === 'Escape') {
            closeAllPopups()
        }
    }

    // *попытка реализовать дополнительно закрытие любого попапа по клику на
    // оверлей(через пропс)
    function handleCloseOverlay(e) {
        if (e.target === e.currentTarget) {
            closeAllPopups();
        }
    }

    //запрос на сервер за данными о профиле юзера
    function handleUpdateUser(user) {
        apiConfig
            .editUserInfo(user)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`)
            })
        } {/*  //Todoo реализовать интерактивное изменение текста кнопки сабмита, для польз
 *  ователей с плохим интернетом

 */
    }

    //запрос на сервер за удалением карточки
    function handleCardDelete(card) {
        apiConfig
            .deleteCard(card._id)
            .then(() => {
                setCards((items) => items.filter((c) => c._id !== card._id && c))
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`)
            })
        }

    //запрос на сервер за аватаркой юзера
    function handleUpdateAvatar(avatar) {
        apiConfig
            .editAvatar(avatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`)
            })
        }

    //запрос на сервер за добавлением карточки
    function handleAddPlaceSubmit(data) {
        apiConfig
            .addCard(data)
            .then((newCard) => {
                setCards([
                    newCard, ...cards
                ]);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`)
            });
    } {/* //Todoo хорошо бы реализовать свою валидацию а не просто встроеную */
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <section className='content'>
                <div className="page">
                    <Header loggedIn={loggedIn} userEmail={userEmail}/>
                    <Switch>
                        <Route path="/sign-in">
                            <Login onLogin={handleLogin}/>
                        </Route>
                        <Route path="/sign-up">
                            <Register onRegister={handleRegister}/>
                        </Route>
                        <ProtectedRoute
                            exact="exact"
                            path='/'
                            loggedIn={loggedIn}
                            component={Main}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            onEditProfile={handleEditProfileClick}
                            onEditAvatar={handleEditAvatarClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            card={cards}/>
                        <Route path="*">
                            {
                                loggedIn
                                    ? <Redirect to="/"/>
                                    : <Redirect to="/sign-in"/>
                            }
                        </Route>
                    </Switch>

                    <InfoTooltip
                        open={isInfoTooltipOpen}
                        close={closeAllPopups}
                        isSuccess={isSuccess}
                        onOverlayClose={handleCloseOverlay}
                        onButtonEsc={handleEscButton}
                        ifErrorText={"Что-то пошло не так! Попробуйте ещё раз."}
                        ifAcceptText={"Вы успешно зарегистрировались!"}/>

                    <EditProfilePopup
                        open={isEditProfilePopupOpen}
                        close={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        onOverlayClose={handleCloseOverlay}
                        onButtonEsc={handleEscButton}/>

                    <EditAvatarPopup
                        open={isEditAvatarPopupOpen}
                        close={closeAllPopups}
                        onSubmit={handleUpdateAvatar}
                        onOverlayClose={handleCloseOverlay}
                        onButtonEsc={handleEscButton}/>

                    <AddPlacePopup
                        open={isAddPlacePopupOpen}
                        close={closeAllPopups}
                        onSubmit={handleAddPlaceSubmit}
                        onOverlayClose={handleCloseOverlay}
                        onButtonEsc={handleEscButton}/>

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                        onOverlayClose={handleCloseOverlay}
                        onButtonEsc={handleEscButton}/> {/* //Todoo сделать попап подтверждения удаления карточки */}

                </div>
            </section>
        </CurrentUserContext.Provider>
    );
}

export default App;

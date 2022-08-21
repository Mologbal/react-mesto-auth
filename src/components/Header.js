import React from "react";
import headerLogoPath from '../images/headerLogo.svg'
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {
    return(
        <header className="header">
        <img className="header__logo" src={headerLogoPath} alt="Место логотип" />
        <Switch>
        <Route exact path='/'>
              <div className='header__container'>
                <p className='header__email'>{props.userEmail}</p>
                <Link className='header__link' to='sign-in' onClick={props.onSignOut}>
                  Выйти
                </Link>
              </div>
            </Route>
            <Route path='/sign-up'>
              <Link className='header__link' to='sign-in'>
                 Войти
              </Link>
            </Route>
            <Route path='/sign-in'>
              <Link className='header__link' to='sign-up'>
                Регистрация
              </Link>
            </Route>
        </Switch>
        </header>
    )
}

export default Header;
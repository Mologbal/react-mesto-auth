import React from "react";
import headerLogoPath from '../images/headerLogo.svg'

function Header() {
    return(
        <header className="header">
        <img className="header__logo" src={headerLogoPath} alt="Место логотип" />
        </header>
    )
}

export default Header;
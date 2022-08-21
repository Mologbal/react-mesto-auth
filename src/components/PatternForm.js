import React from "react";
import { Link } from 'react-router-dom'

function PatternForm(props) {
    return(
        <section className="hello">
            <h1 className='hello__title'>{props.title}</h1>
            <form className='hello__form' onSubmit={props.onSubmit} name={`${props.name}-form`}>
                {props.children}
                <button type='submit' className='hello__submit'>{props.buttonText}</button>
                {props.name === 'register' && 
                <div className='hello__question'>
                    <p className='hello__question-text'>Уже зарегестрированы?</p>
                    <Link to='/sign-in' className='hello__question-link'>Войти</Link>
                </div>
                }
            </form>
        </section>
    )
}

export default PatternForm;
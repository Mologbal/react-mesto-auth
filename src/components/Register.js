import React from "react";
import PatternForm from "./PatternForm";

function Register(props) {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    function editLogin(evt) {
        setLogin(evt.target.value)
    }

    function editPassword(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister(login, password)
    }

    return (
        <PatternForm
            title={'Регистрация'}
            name={'register'}
            buttonText={'Зарегистрироваться'}
            onSubmit={handleSubmit}>
            <input
                onChange={editLogin}
                className="hello__input"
                required="required"
                placeholder="Login"
                type='email'
                name='email'
                value={login}/>
            <input
                onChange={editPassword}
                className='hello__input'
                required="required"
                placeholder="Password"
                type='password'
                name='password'
                value={password}
                minLength='4'/>
        </PatternForm>
    )
}

export default Register;
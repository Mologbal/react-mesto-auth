import React from "react";
import PatternForm from "./PatternForm";

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function editLogin(evt) {
        setEmail(evt.target.value)
    }

    function editPassword(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onLogin(email, password)
    }

    return(
        <PatternForm
        title={'Вход'}
        name={'login'}
        buttonText={'Войти'}
        onSubmit={handleSubmit}>
         <input onChange={editLogin} className="hello__input" required placeholder="Login" type='email' name='email' value={email} />
         <input onChange={editPassword} className='hello__input' required placeholder="Password" type='password' name='password' value={password} minLength='4' />
        </PatternForm>
    )
}

export default Login;
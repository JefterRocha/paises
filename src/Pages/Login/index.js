import React, {useState, useCallback, useContext} from "react";
import {withRouter, Redirect} from "react-router";
import DataFirebase from "../../Data";
import {AuthContext} from "../../Auth.js";
import {Link} from "react-router-dom";

const Login = ({history}) => {
    const [erroEmailPassword, setErroEmailPassword] = useState('');

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await DataFirebase
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                switch (error.code) {
                    case "auth/wrong-password":
                        setErroEmailPassword('Senha incorreta!');
                        break;
                    case "auth/invalid-email":
                        setErroEmailPassword('E-mail inválido!');
                        break;
                    case "auth/user-not-found":
                        setErroEmailPassword('Usuário inexistente!');
                        break;
                    case "auth/too-many-requests":
                        setErroEmailPassword('Muitas tentativas de login sem sucesso. Por favor, tente novamente mais tarde.');
                        break;
                    default:
                        setErroEmailPassword('');
                }
            }
        },
        [history]
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return <>
        <div
            className="h-100 w-100 d-flex justify-content-center align-items-center">
            <div className="Container m-3">
                <h1 className="Title">Login</h1>

                <form onSubmit={handleLogin}>
                    <label>
                        <input className="Input" name="email" type="email"
                               placeholder="E-mail"/>
                    </label>

                    <label>
                        <input className="Input" name="password" type="password"
                               placeholder="Senha"/>
                    </label>
                    {erroEmailPassword !== '' &&
                    <span className="Error">{erroEmailPassword}</span>
                    }
                    <button className="Button" type="submit">Entrar</button>
                    <p className="LinkAction">
                        Ainda não está inscrito?
                        <Link to="/signup">Inscreva-se!</Link>
                    </p>
                </form>
            </div>
        </div>
    </>;
};

export default withRouter(Login);
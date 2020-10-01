import React, {useCallback, useState} from "react";
import {withRouter} from "react-router";
import DataFirebase from "../../Data";
import {Link} from "react-router-dom";


const SignUp = ({history}) => {
    const [erroEmailPassword, setErroEmailPassword] = useState('');

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await DataFirebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            console.log(error)
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
                case "auth/weak-password":
                    setErroEmailPassword('A senha deve ter pelo menos 6 caracteres!');
                    break;
                default:
                    setErroEmailPassword('');
            }
        }
    }, [history]);

    return <>
        <div
            className="h-100 w-100 d-flex justify-content-center align-items-center">
            <div className="Container m-3">
                <h1 className="Title">Inscrição</h1>
                <form onSubmit={handleSignUp}>
                    <label>
                        <input className="Input" name="email" type="email"
                               placeholder="E-mail"/>
                    </label>
                    <label>
                        <input className="Input" name="password" type="password"
                               placeholder="Senha"/>
                    </label>
                    <span className="Error">{erroEmailPassword}</span>
                    <button className="Button" type="submit">
                        Inscrever-se
                    </button>
                    <p className="LinkAction">
                        Já está inscrito? Faça agora seu
                        <Link to="/login">login!</Link>
                    </p>
                </form>
            </div>
        </div>
    </>;
};

export default withRouter(SignUp);
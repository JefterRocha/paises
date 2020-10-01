import React, {useEffect, useState} from "react";
import DataFirebase from "./Data";
import { Spinner } from 'reactstrap';

export const AuthContext = React.createContext([]);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        DataFirebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if (pending) {
        return <>
            <div className="Loading">
                <Spinner color="light" style={{ width: '3rem', height: '3rem', marginBottom: '1rem' }} />{' '}
                Carregando...
            </div>
        </>
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};
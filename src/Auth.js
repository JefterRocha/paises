import React, { useEffect, useState } from 'react'
import DataFirebase from './Data'
import { Spinner } from 'react-bootstrap'

export const AuthContext = React.createContext([])

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        DataFirebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        })
    }, [])

    return pending ? <div>
        <Spinner animation='border' style={{ width: '3rem', height: '3rem', margin: 'auto' }}>
            <span className='sr-only'>Carregando...</span>
        </Spinner>
    </div> : <AuthContext.Provider value={{ currentUser }}>
            {children}
            <h1>FUNCIONOU!</h1>
        </AuthContext.Provider>
}
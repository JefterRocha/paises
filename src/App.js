import React from 'react'
import './styles.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Graph from './Pages/Graph'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { AuthProvider } from './Auth'
import PrivateRoute from './Routes/PrivateRoute'
import { CountryProvider } from './context'

export default function App() {
    return <CountryProvider>
        <AuthProvider>
            <Router>
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute exact path='/graph' component={Graph} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
            </Router>
        </AuthProvider>
    </CountryProvider>
}
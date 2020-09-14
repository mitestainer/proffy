import React, {createContext, useEffect, useState} from 'react'
import api from '../services/api'

interface AuthContextData {
    loggedIn: boolean | null
    setStatus: any
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(null)

    useEffect(() => {
        api.get('/getStatus').then(res => setLoggedIn(res.data))
    }, [isLoggedIn])

    return (
    <AuthContext.Provider value={{loggedIn: isLoggedIn, setStatus: setLoggedIn}}>
        {children}
    </AuthContext.Provider>
)}

export default AuthContext
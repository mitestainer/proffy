import React, { useContext } from 'react'
import {Route, Redirect, RouteProps} from 'react-router-dom'
import AuthContext from '../../contexts/auth'

interface RouteInterface extends RouteProps {
    component: any
}

const ProtectedRoute: React.FC<RouteInterface> = ({component: Component, ...rest}) => {
    const {loggedIn} = useContext(AuthContext)
    
    return (
        <Route {...rest} render={(props) => {
            switch (loggedIn) {
                case true:
                    return <Component {...props} />      
                case false:
                    return <Redirect to={{pathname: "/login", state: {from: props.location}}} />
                default:
                    return null;
            }
        }} />
    )
}

export default ProtectedRoute
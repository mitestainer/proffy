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
                    return <Redirect to={{pathname: "/study", state: {from: props.location}}} />
                case false:
                    return <Component {...props} />      
                default:
                    return null;
            }
        }} />
    )
}

export default ProtectedRoute
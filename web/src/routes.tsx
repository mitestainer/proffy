import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import PasswordRecovery from './pages/PasswordRecovery'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm'
import ProtectedRoute from './components/ProtectedRoute'
import OutsideRoute from './components/OutsideRoute'

export default () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <OutsideRoute path="/login" component={Login} />
            <OutsideRoute path="/signup" component={SignUp} />
            <OutsideRoute path="/password-recovery" component={PasswordRecovery} />
            <ProtectedRoute path="/study" component={TeacherList} />
            <ProtectedRoute path="/give-classes" component={TeacherForm} />
        </BrowserRouter>
    )
}
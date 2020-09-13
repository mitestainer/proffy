import React, { useState, FormEvent, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Input from '../../components/Input'
import Password from '../../components/Password'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'

import Logo from '../../assets/images/logo-login.svg'

import api from '../../services/api'
import AuthContext from '../../contexts/auth'

import './styles.scss'

export default () => {
    const history = useHistory()
    const {setStatus} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRememberMeChecked, setRememberMe] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await api.post('/login', {
                email, password, isRememberMeChecked
            })
            setStatus(true)
            history.push('/study')
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleRememberMe = () => setRememberMe(!isRememberMeChecked)

    return (
        <div id="page-login">
            <div id="login-upper">
                <img src={Logo} alt="Proffy - Sua plataforma de estudos online." />
            </div>
            <div id="login-form">
                <form onSubmit={handleSubmit}>
                    <h1>Fazer login</h1>
                    <Link to="/signup">Criar uma conta</Link>
                    <Input placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
                    <Password placeholder="Senha" onChange={e => setPassword(e.target.value)} toggleShowHide={password.length > 0} />
                    <Checkbox label="Lembrar-me" handleClick={handleRememberMe} isChecked={isRememberMeChecked} />
                    <Link to="/password-recovery">Esqueci minha senha</Link>
                    <Button text="Entrar" disabled={email && password ? false : true} />
                </form>
            </div>
        </div>
    )
}
import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'


import Input from '../../components/Input'
import Password from '../../components/Password'
import Button from '../../components/Button'

import backIcon from '../../assets/images/icons/back-darker.svg'
import Logo from '../../assets/images/logo-login.svg'

import './styles.scss'

export default () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log({
            firstName, lastName, email, password
        })
    }

    return (
        <div id="page-signup">
            <div id="signup-form">
                <Link to="/login">
                    <img src={backIcon} alt="Voltar" className="back-arrow" />
                </Link>
                <h1>Cadastro</h1>
                <p>Preencha os dados abaixo para começar.</p>
                <form onSubmit={handleSubmit}>
                    <Input placeholder="Nome" onChange={e => setFirstName(e.target.value)} />
                    <Input placeholder="Sobrenome" onChange={e => setLastName(e.target.value)} />
                    <Input placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
                    <Password placeholder="Senha" onChange={e => setPassword(e.target.value)} toggleShowHide={password.length > 0} />
                    <Button text="Concluir cadastro" disabled={firstName && lastName && email && password ? false : true} />
                </form>
            </div>
            <div id="signup-under">
                <img src={Logo} alt="Proffy - Sua plataforma de estudos online." />
            </div>
        </div>
    )
}
import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'


import Input from '../../components/Input'
import Button from '../../components/Button'

import backIcon from '../../assets/images/icons/back-darker.svg'
import Logo from '../../assets/images/logo-login.svg'

import './styles.scss'

export default () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log({
            email
        })
    }

    return (
        <div id="page-password-recovery">
            <div id="password-recovery-form">
                <Link to="/login">
                    <img src={backIcon} alt="Voltar" className="back-arrow" />
                </Link>
                <h1>Eita, esqueceu sua senha?</h1>
                <p>Não esquenta, vamos dar um jeito nisso.</p>
                <form onSubmit={handleSubmit}>
                    <Input placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
                    <Button text="Enviar" disabled={email ? false : true} />
                </form>
            </div>
            <div id="password-recovery-under">
                <img src={Logo} alt="Proffy - Sua plataforma de estudos online." />
            </div>
        </div>
    )
}
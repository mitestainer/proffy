import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingLogo from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import api from '../../services/api'
import AuthContext from '../../contexts/auth'

import './styles.scss'

export default () => {
    const history = useHistory()
    const {loggedIn} = useContext(AuthContext)
    const [totalConnections, setTotalConnections] = useState(0)
    
    useEffect(() => { api.get('connections').then(res => setTotalConnections(res.data.total)) }, [])

    return (
        <div id="page-landing">
            {!loggedIn && <button onClick={() => history.push('/login')}>
                Login
            </button>}
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                <img src={landingLogo} alt="Plataforma de estudos" className="hero-image" />
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar Aulas"/>
                        Dar Aulas
                    </Link>
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>
            </div>
        </div>
    )
}
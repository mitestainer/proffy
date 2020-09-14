import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import backIcon from '../../assets/images/icons/back.svg'

import api from '../../services/api'
import AuthContext from '../../contexts/auth'

import './styles.scss'

interface PageHeaderProps {
    title: string;
    description?: string
    iconImg?: string
    iconText?: string
    page: string
}

const PageHeader: React.FC<PageHeaderProps> = props => {
    const {loggedIn, setStatus} = useContext(AuthContext)

    const [isMenuOpen, toggleMenu] = useState(false)

    const logout = () => {
        api.post('/logout').then(() => setStatus(false))
    }

    return (
        <header className="page-header">
            <div className="top-bar-container">
                <div className="top-bar-wrapper">
                    <Link to="/">
                        <img src={backIcon} alt="Voltar"/>
                    </Link>
                    <span>{props.page}</span>
                    {loggedIn && <div className="profile-picture" onClick={() => toggleMenu(!isMenuOpen)}>
                        <img src="https://housing.uga.edu/uploads/staff_photos/people_placeholder.png" alt="User pitcure"/>
                    </div>}
                    {loggedIn && <div id="menu" className={isMenuOpen === false ? "menu-closed" : "menu-open"}>
                        <li>
                            <ul>Perfil</ul>
                            <ul onClick={logout}>Sair</ul>
                        </li>
                    </div>}
                </div>
            </div>
            <div className="header-content">
                <div className="header-wrapper">
                    <strong>{props.title}</strong>
                    <div className="header-inner">
                        {props.description && <p>{props.description}</p>}
                        {props.iconImg && <div className="icon-area">
                            <img src={require(`../../assets/images/icons/${props.iconImg}.svg`)} alt={props.iconImg} />
                            <p>{props.iconText}</p>
                        </div>}
                    </div>
                </div>
                {props.children}
            </div>
        </header>
    )
}

export default PageHeader
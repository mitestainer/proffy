import React from 'react'
import { Link } from 'react-router-dom'

import backIcon from '../../assets/images/icons/back.svg'
import logoImage from '../../assets/images/logo.svg'

import './styles.scss'

interface PageHeaderProps {
    title: string;
    description?: string
    iconImg?: string
    iconText?: string
}

const PageHeader: React.FC<PageHeaderProps> = props => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoImage} alt="Proffy"/>
            </div>
            <div className="header-content">
                <div className="header-top">
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
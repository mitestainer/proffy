import React from 'react'
import {useHistory} from 'react-router-dom'

import Button from '../Button'

import Done from '../../assets/images/icons/done.svg'

import './styles.scss'

interface SuccessProps {
    title: string
    text: string
    buttonText: string
}

const Success: React.FC<SuccessProps> = ({title, text, buttonText}) => {
    const history = useHistory()

    const goToLogin = () => history.push('/login')

    return (
        <div id="success-screen">
            <div id="inner">
                <div>
                    <img src={Done} alt="done"/>
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
                <Button text={buttonText} onClick={goToLogin} />
            </div>
        </div>
    )
}

export default Success
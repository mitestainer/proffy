import React, {InputHTMLAttributes, useState} from 'react'

import ShowPassword from '../../assets/images/icons/show-password.svg'
import HidePassword from '../../assets/images/icons/hide-password.svg'

import './styles.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    toggleShowHide?: boolean
}

const Input: React.FC<InputProps> = ({toggleShowHide, ...rest}) => {
    const [type, setType] = useState('password')
    const changeType = () => {
        if (type === 'password') setType('text')
        if (type === 'text') setType('password')
    }
    return (
        <div className="action-block input-block">
            <input type={type} {...rest} />
            {toggleShowHide && <img className="show-password" src={type === 'text' ? HidePassword : ShowPassword} alt="show-password" onClick={changeType} />}
        </div>
    )
}

export default Input
import React, {InputHTMLAttributes} from 'react'

import './styles.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    name: string
}

const Input: React.FC<InputProps> = ({label, name, ...rest}) => {
    return (
        <div className="action-block input-block">
            <label htmlFor={name} className="input-label">{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
    )
}

export default Input
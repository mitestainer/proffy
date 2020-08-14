import React, {InputHTMLAttributes} from 'react'
import Cleave from 'cleave.js/react'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const Input: React.FC<InputProps> = ({label, name, ...rest}) => {
    const options = {
        time: true,
        timePattern: ['h', 'm']
    }
    return (
        <div className="input-block date-input">
            <span className="date-label">{label}</span>
            <Cleave options={options} placeholder={'--:--'} {...rest} />
        </div>
    )
}

export default Input
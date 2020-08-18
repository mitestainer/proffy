import React, {InputHTMLAttributes} from 'react'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.br'

import './styles.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const Input: React.FC<InputProps> = ({label, name, ...rest}) => {
    const options = {
        phone: true,
        phoneRegionCode: 'BR'
    }
    return (
        <div className="action-block input-block">
            <span className="input-label">{label}</span>
            <Cleave options={options} {...rest} />
        </div>
    )
}

export default Input
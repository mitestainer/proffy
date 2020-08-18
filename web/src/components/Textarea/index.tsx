import React, {TextareaHTMLAttributes} from 'react'

import './styles.scss'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
    name: string
}

const Textarea: React.FC<TextareaProps> = ({label, name, ...rest}) => {
    return (
        <div className="action-block textarea-block">
            <label htmlFor={name} className="input-label">{label}</label>
            <textarea id={name} {...rest} />
        </div>
    )
}

export default Textarea
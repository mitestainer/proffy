import React from 'react'

import './styles.scss'

interface ButtonProps {
    text: string,
    image?: any,
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({text, image, disabled}) => {
    return (
        <button type="submit" className="action-button" disabled={disabled}>
            {!image ? text : <img src={image} alt={text} />}
        </button>
    )
}

export default Button
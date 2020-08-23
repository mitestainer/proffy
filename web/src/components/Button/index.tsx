import React from 'react'

import './styles.scss'

interface ButtonProps {
    text: string,
    image?: any,
    disabled?: boolean
    onClick?: any
}

const Button: React.FC<ButtonProps> = ({text, image, disabled, onClick}) => {
    return (
        <button type="submit" className="action-button" disabled={disabled} onClick={onClick}>
            {!image ? text : <img src={image} alt={text} />}
        </button>
    )
}

export default Button
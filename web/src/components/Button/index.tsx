import React from 'react'

import './styles.css'

interface ButtonProps {
    text: string,
    image?: any
}

const Button: React.FC<ButtonProps> = ({text, image}) => {
    return (
        <button type="submit" className="action-button">
            {!image ? text : <img src={image} alt={text} />}
        </button>
    )
}

export default Button
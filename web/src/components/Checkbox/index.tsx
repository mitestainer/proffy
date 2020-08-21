import React from 'react'

import Tick from '../../assets/images/icons/tick.svg'

import './styles.scss'

interface CheckboxProps {
    label: string,
    handleClick: any,
    isChecked: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({label, handleClick, isChecked}) => {
    return (
        <div className="checkbox-input">
            <input type="checkbox" checked={isChecked} id="check" readOnly />
            <div className="checkbox" onClick={handleClick}>
                <img src={Tick} alt="tick" />
            </div>
            <span onClick={handleClick}>{label}</span>
        </div>
    )
}

export default Checkbox
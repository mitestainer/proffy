import React, {useState} from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

import selectArrow from '../../assets/images/icons/select-arrow.svg'

import './styles.css'

interface SelectProps {
    label: string
    options: Array<{value: string, label: string}>
    handleClick: any
    index?: number
}

const Select: React.FC<SelectProps> = ({label, options, handleClick, index}) => {
    const [isDropdownOpen, setDropdownState] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState<string>('')

    const toggle = () => setDropdownState(!isDropdownOpen)

    const handleSelectedValue = (value: string, label: string) => {
        if (index !== undefined) {
            handleClick(index, 'weekday', value)
        } else {
            handleClick(value)
        }
        setSelectedLabel(label)
    }

    return (
        <div className="input-block select-block">
            <span className="select-label">{label}</span>
            <OutsideClickHandler onOutsideClick={() => setDropdownState(false)}>
                <div className={`dropdown-selector${isDropdownOpen ? ' dropdown-open' : ''}`} onClick={toggle}>
                    <span className={selectedLabel ? 'select-label-selected' : ''}>
                        {!selectedLabel ? 'Selecione' : selectedLabel}
                        <img src={selectArrow} alt="arrow" className={isDropdownOpen ? 'arrow-dropdown-open' : ''} />
                    </span>
                    {isDropdownOpen && <div className="dropdown-options">
                        <ul>
                            {options.map(option => <li key={option.value} onClick={() => handleSelectedValue(option.value, option.label)}>{option.label}</li>)}
                        </ul>
                    </div>}
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default Select
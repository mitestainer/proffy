import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

export default () => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://randomuser.me/api/portraits/men/31.jpg" alt="teacher"/>
                <div>
                    <strong>Teacher</strong>
                    <span>Química</span>
                </div>
            </header>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                <br /><br />
            Unde dolore mollitia magni eius recusandae! Necessitatibus mollitia placeat fugit corporis earum. Magnam, aliquid commodi.
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 20,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}
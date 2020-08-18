import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import api from '../../services/api'

import './styles.scss'

export interface Teacher {
    id: number,
    subject: string,
    cost: number,
    name: string,
    avatar: string
    whatsapp: string,
    bio: string
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    const createNewConnection = () => {
        api.post('/connections', {
            user_id: teacher.id
        })
    }
    const {name, subject, bio, avatar, cost, whatsapp} = teacher
    return (
        <article className="teacher-item">
            <header>
                <img src={avatar} alt={name} />
                <div>
                    <strong>{name}</strong>
                    <span>{subject}</span>
                </div>
            </header>
            <p>{bio}</p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {cost}</strong>
                </p>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={createNewConnection}>
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem
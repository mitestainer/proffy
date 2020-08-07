import React, {useState, FormEvent} from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, {Teacher} from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import api from '../../services/api'

import './styles.css'

export default () => {
    const [subject, setSubject] = useState('')
    const [weekday, setWeekday] = useState('')
    const [time, setTime] = useState('')

    const [teachers, setTeachers] = useState([])

    const searchTeachers = async (e: FormEvent) => {
        e.preventDefault()
        const res = await api.get('classes', { params: {subject, weekday, time} })
        setTeachers(res.data)
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria" 
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: 'artes', label: 'Artes' },
                            { value: 'biologia', label: 'Biologia' },
                            { value: 'ciencias', label: 'Ciências' },
                            { value: 'espanhol', label: 'Espanhol' },
                            { value: 'fisica', label: 'Física' },
                            { value: 'geografia', label: 'Geografia' },
                            { value: 'historia', label: 'História' },
                            { value: 'ingles', label: 'Inglês' },
                            { value: 'literatura', label: 'Literatura' },
                            { value: 'mathematica', label: 'Matemática' },
                            { value: 'portugues', label: 'Português' },
                            { value: 'quimica', label: 'Química' },
                            { value: 'redacao', label: 'Redação' }
                        ]} 
                    />
                    <Select 
                        name="weekday" 
                        label="Dia da semana" 
                        value={weekday}
                        onChange={e => setWeekday(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' }
                        ]} 
                    />
                    <Input type="time" name="time" label="Hora" value={time} onChange={e => setTime(e.target.value)} />
                    <button type="submit" id="search-teacher-button">!!</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} />)}
            </main>
        </div>
    )
}
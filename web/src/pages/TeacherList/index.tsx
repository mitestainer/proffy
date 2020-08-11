import React, {useState, useEffect, FormEvent} from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, {Teacher} from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import Loading from '../../components/Loading'

import api from '../../services/api'

import magnifierIcon from '../../assets/images/icons/magnifier.svg'

import './styles.css'

export default () => {
    const [isLoading, setIsLoading] = useState(true)

    const [subject, setSubject] = useState('')
    const [weekday, setWeekday] = useState('')
    const [time, setTime] = useState('')

    const [teachers, setTeachers] = useState([])

    const searchTeachers = async (e: FormEvent) => {
        e.preventDefault()
        const res = await api.get('classes', { params: {subject, weekday, time} })
        setTeachers(res.data)
    }

    useEffect(() => { 
        api.get('classes').then(res => {
            setTeachers(res.data)
            setIsLoading(false)
        }) 
    }, [])

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        label="Matéria" 
                        handleClick={setSubject}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Espanhol', label: 'Espanhol' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' },
                            { value: 'Inglês', label: 'Inglês' },
                            { value: 'Literatura', label: 'Literatura' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Redação', label: 'Redação' }
                        ]} 
                    />
                    <Select 
                        label="Dia da semana" 
                        handleClick={setWeekday}
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
                    <Button image={magnifierIcon} text="Buscar" />
                </form>
            </PageHeader>

            <main>
                {isLoading ? <Loading /> : teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} />)}
            </main>
        </div>
    )
}
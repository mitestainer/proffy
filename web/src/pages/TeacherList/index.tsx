import React, {useState, useEffect, FormEvent} from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, {Teacher} from '../../components/TeacherItem'
import TimeInput from '../../components/TimeInput'
import Select from '../../components/Select'
import Button from '../../components/Button'
import Loading from '../../components/Loading'

import api from '../../services/api'

import filter from '../../assets/images/icons/filter.svg'
import selectArrow from '../../assets/images/icons/select-arrow.svg'
import magnifierIcon from '../../assets/images/icons/magnifier.svg'

import './styles.scss'

export default () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isSearchOpen, setSearchStatus] = useState(false)
    const [isOverflowHidden, setOverflowHidden] = useState(true)

    const [subject, setSubject] = useState('')
    const [weekday, setWeekday] = useState('')
    const [time, setTime] = useState('')

    const [teachers, setTeachers] = useState([])

    const toggleSearch = () => {
        setSearchStatus(!isSearchOpen)
        if (isOverflowHidden === true) {
            setTimeout(() => {
                setOverflowHidden(false)
            }, 750);
        } else {
            setOverflowHidden(true)
        }
    }

    const searchTeachers = async (e: FormEvent) => {
        e.preventDefault()
        const res = await api.get('classes', { params: {subject, weekday, time} })
        setTeachers(res.data)
        toggleSearch()
    }

    useEffect(() => { 
        api.get('classes').then(res => {
            setTeachers(res.data)
            setIsLoading(false)
        }) 
    }, [])

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader 
                title="Estes são os proffys disponíveis."
                iconImg="smile"
                iconText={!teachers.length ? 'Nenhum professor' : `${teachers.length} professor${teachers.length > 1 ? 'es' : ''}`}
            >
                <div id="toggle-search" onClick={toggleSearch}>
                    <img src={filter} alt="filter" />
                    <span>Filtrar por dia, hora e matéria</span>
                    <img src={selectArrow} alt="arrow" style={isSearchOpen ? {transform: 'rotate(-180deg)'} : {}} />
                </div>
                <div id="search-teachers" style={!isSearchOpen ? {height: 0} : {}} className={isOverflowHidden ? 'hidden' : 'visible'}>
                    <form onSubmit={searchTeachers}>
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
                        <TimeInput label="Hora" onChange={e => setTime(e.target.value)} />
                        <Button image={magnifierIcon} text="Buscar" />
                    </form>
                </div>
            </PageHeader>

            <main>
                {isLoading ? <Loading /> : teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} />)}
            </main>
        </div>
    )
}
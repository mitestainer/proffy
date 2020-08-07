import React, {useState, FormEvent} from 'react'
import {useHistory} from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import api from '../../services/api'

import './styles.css'

export default () => {
    const history = useHistory()

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState([{weekday: 0, from: '', to: ''}])
    const addNewScheduleItem = () => setScheduleItems([...scheduleItems, {weekday: 0, from: '', to: ''}])
    const setScheduleItemValue = (index: number, weekday: string, value: string) => {
        const updatedScheduleItem = scheduleItems.map((scheduleItem, i) => index === i ? {...scheduleItem, [weekday]: value} : scheduleItem)
        setScheduleItems(updatedScheduleItem)
    }

    const handleCreateClass = (e: FormEvent) => {
        e.preventDefault()
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })
        .then(() => {
            alert('Cadastro realizado com sucesso!')
            history.push('/')
        })
        .catch(() => alert('Erro no cadastro'))
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas." 
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" label="Nome completo" value={name} onChange={e => setName(e.target.value)} />
                        <Input name="avatar" label="Avatar" value={avatar} onChange={e => setAvatar(e.target.value)} />
                        <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                        <Textarea name="bio" label="Biografia" value={bio} onChange={e => setBio(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
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
                        <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={e => setCost(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        {scheduleItems.map((item, i) => {
                            return (
                                <div key={item.weekday} className="schedule-item">
                                    <Select 
                                        name="weekday" 
                                        label="Dia da semana" 
                                        value={item.weekday}
                                        onChange={e => setScheduleItemValue(i, 'weekday', e.target.value)}
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
                                    <Input name="from" label="Das" type="time" value={item.from} onChange={e => setScheduleItemValue(i, 'from', e.target.value)} />
                                    <Input name="to" label="Até" type="time" value={item.to} onChange={e => setScheduleItemValue(i, 'to', e.target.value)} />
                                </div>
                            )
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante! <br />
                            Preencha todos os dados.
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}
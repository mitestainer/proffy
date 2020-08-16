import React, {useState, FormEvent} from 'react'
import {useHistory} from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import PhoneInput from '../../components/PhoneInput'
import TimeInput from '../../components/TimeInput'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import Button from '../../components/Button'

import warningIcon from '../../assets/images/icons/warning.svg'

import api from '../../services/api'

import './styles.css'

export default () => {
    const history = useHistory()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
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
    const deleteScheduleItem = (index: number) => {
        const items = [...scheduleItems]
        items.splice(index, 1)
        setScheduleItems(items)
    }

    const handleCreateClass = (e: FormEvent) => {
        e.preventDefault()
        api.post('classes', {
            name: `${name} ${surname}`,
            avatar,
            whatsapp: `55${whatsapp.replace(/ /g, '')}`,
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
                iconImg="rocket"
                iconText="Prepare-se! Vai&nbsp;ser&nbsp;o&nbsp;máximo."

            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <div id="your-data">
                            <Input name="name" label="Nome" value={name} onChange={e => setName(e.target.value)} />
                            <Input name="surname" label="Sobrenome" value={surname} onChange={e => setSurname(e.target.value)} />
                            <Input name="avatar" label="Avatar" value={avatar} onChange={e => setAvatar(e.target.value)} />
                            <PhoneInput name="whatsapp" label="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                            <Textarea name="bio" label="Biografia" value={bio} onChange={e => setBio(e.target.value)} />
                        </div>
                    </fieldset>
                    <fieldset id="about-class">
                        <legend>Sobre a aula</legend>
                        <div id="about-class">
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
                            <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={e => setCost(e.target.value)} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <div>
                                <span>Horários disponíveis</span>
                                <button type="button" onClick={addNewScheduleItem}>+ Novo</button>
                            </div>
                        </legend>
                        {scheduleItems.map((item, i) => {
                            return (
                                <div key={i} className="schedule-item">
                                    <Select 
                                        label="Dia da semana" 
                                        index={i}
                                        handleClick={setScheduleItemValue}
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
                                    <TimeInput label="Das" onChange={e => setScheduleItemValue(i, 'from', e.target.value)} />
                                    <TimeInput label="Até" onChange={e => setScheduleItemValue(i, 'to', e.target.value)} />
                                    {scheduleItems.length > 1 && <div className="delete-schedule-button">
                                        <span></span>
                                        <button type="button" onClick={() => deleteScheduleItem(i)}>Excluir horário</button>
                                        <span></span>
                                    </div>}
                                </div>
                            )
                        })}
                    </fieldset>
                    <footer>
                        <Button text="Salvar cadastro" />
                        <div className="footer-wrapper">
                            <img src={warningIcon} alt="Aviso Importante"/>
                            <div>
                                <p><span>Importante!</span></p>
                                <p>Preencha todos os dados.</p>
                            </div>
                        </div>
                    </footer>
                </form>
            </main>
        </div>
    )
}
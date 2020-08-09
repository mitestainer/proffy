import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import styles  from './styles'

export default () => {
    const [subject, setSubject] = useState('')
    const [weekday, setWeekday] = useState('')
    const [time, setTime] = useState('')

    const [isFilterFisible, setIsFilterVisible] = useState(false)
    const toggleFilter = () => setIsFilterVisible(!isFilterFisible)

    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])
    
    const handleFilterSubmit = async () => {
        loadFavorites()
        const res = await api.get('classes', { params: {subject, weekday, time} })
        setTeachers(res.data)
        console.log(res.data)
        setIsFilterVisible(false)
    }

    const loadFavorites = () => {
        AsyncStorage.getItem('favorites').then(res => {
            if (res) {
                const favoritedTeachers = JSON.parse(res)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis" headerRight={(
                <BorderlessButton onPress={toggleFilter}>
                    <Feather name="filter" size={20} color="#fff" />
                </BorderlessButton>
            )}>
                { isFilterFisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput 
                        style={styles.input} 
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        placeholder="Qual a matéria?" 
                        placeholderTextColor="#c1bccc" 
                    />
                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput 
                                style={styles.input} 
                                value={weekday}
                                onChangeText={text => setWeekday(text)}
                                placeholder="Qual o dia?" 
                                placeholderTextColor="#c1bccc" 
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput 
                                style={styles.input} 
                                value={time} 
                                onChangeText={text => setTime(text)}
                                placeholder="Qual horário?" 
                                placeholderTextColor="#c1bccc" 
                            />
                        </View>
                    </View>
                    <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>) }
            </PageHeader>
            <ScrollView 
                style={styles.teacherList} 
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}>
                {teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />)}
            </ScrollView>
        </View>
    )
}
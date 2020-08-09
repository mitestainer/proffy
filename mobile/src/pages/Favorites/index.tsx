import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader'
import TeacherItem, {Teacher} from '../../components/TeacherItem'

import styles from './styles'

export default () => {
    const [favorites, setFavorites] = useState([])

    const loadFavorites = () => {
        AsyncStorage.getItem('favorites').then(res => {
            if (res) {
                const favoritedTeachers = JSON.parse(res)
                setFavorites(favoritedTeachers)
            }
        })
    }

    useFocusEffect(React.useCallback(() => { loadFavorites() }, []))

    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys favoritos" />
            <ScrollView 
                style={styles.teacherList} 
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}>
                {favorites.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} favorited />)}
            </ScrollView>
        </View>
    )
}
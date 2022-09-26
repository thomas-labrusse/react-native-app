import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { getCurrentStreak, getCurrentWeekStreak } from '../../utils/stats'
import { Colors } from '../../constants/colors'

const CurrentStreak = ({ validations, reps }) => {
	const currentStreak = getCurrentStreak(validations)

	return <Text style={styles.text}>{currentStreak}</Text>
}

export default CurrentStreak

const styles = StyleSheet.create({
	text: {
		color: Colors.primary500,
		fontFamily: 'Lato_400Regular',
	},
})

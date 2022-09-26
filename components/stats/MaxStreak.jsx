import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { getMaxStreak } from '../../utils/stats'
import { Colors } from '../../constants/colors'

const MaxStreak = ({ validations }) => {
	const maxStreak = getMaxStreak(validations)

	return <Text style={styles.text}>{maxStreak}</Text>
}

export default MaxStreak

const styles = StyleSheet.create({
	text: {
		color: Colors.primary500,
		fontFamily: 'Lato_400Regular',
	},
})

import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'
import { getSuccessRate } from '../../utils/stats'

const SuccessRate = ({ validations }) => {
	const successRate = getSuccessRate(validations)

	return <Text style={styles.text}>{successRate}%</Text>
}

export default SuccessRate

const styles = StyleSheet.create({
	text: {
		color: Colors.primary500,
		fontFamily: 'Lato_400Regular',
	},
})

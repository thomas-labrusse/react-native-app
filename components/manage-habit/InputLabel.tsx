import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'

const InputLabel = ({ label }: { label: string }) => {
	return <Text style={styles.label}>{label}</Text>
}

export default InputLabel

const styles = StyleSheet.create({
	label: {
		fontSize: 12,
		color: Colors.primary300,
		marginBottom: 4,
		marginHorizontal: 4,
	},
})

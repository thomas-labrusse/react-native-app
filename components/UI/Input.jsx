import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'

const Input = ({ label, textInputConfig }) => {
	const inputStyles = [styles.input]

	if (textInputConfig && textInputConfig.multiline) {
		inputStyles.push(styles.inputMultiline)
	}

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.label}>{label}</Text>
			<TextInput style={inputStyles} {...textInputConfig} />
		</View>
	)
}

export default Input

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 4,
		marginVertical: 8,
	},
	label: {
		fontSize: 12,
		color: Colors.primary300,
		marginBottom: 4,
	},
	input: {
		backgroundColor: Colors.primary300,
		color: Colors.primary500,
		padding: 6,
		borderRadius: 6,
		fontSize: 16,
	},
	inputMultiline: {
		minHeight: 70,
		textAlignVertical: 'top',
	},
})

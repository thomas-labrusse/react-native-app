import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'

const Input = ({ textInputConfig }) => {
	const inputStyles = [styles.input]

	if (textInputConfig && textInputConfig.multiline) {
		inputStyles.push(styles.inputMultiline)
	}

	return <TextInput style={inputStyles} {...textInputConfig} />
}

export default Input

const styles = StyleSheet.create({
	input: {
		backgroundColor: Colors.primary100,
		color: Colors.primary500,
		padding: 6,
		borderRadius: 6,
		fontSize: 16,
		marginHorizontal: 4,
		marginBottom: 16,
	},
	inputMultiline: {
		minHeight: 70,
		textAlignVertical: 'top',
	},
})

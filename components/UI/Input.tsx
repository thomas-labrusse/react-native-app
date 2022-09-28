import React from 'react'
import { TextInput, StyleSheet, TextInputProps } from 'react-native'
import { Colors } from '../../constants/colors'

type InputProps = {
	textInputConfig: TextInputProps
}

const Input = ({ textInputConfig }: InputProps) => {
	const inputStyles: any = [styles.input]

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
		fontFamily: 'Lato_400Regular',
		marginHorizontal: 4,
		marginBottom: 16,
	},
	inputMultiline: {
		minHeight: 70,
		textAlignVertical: 'top',
	},
})

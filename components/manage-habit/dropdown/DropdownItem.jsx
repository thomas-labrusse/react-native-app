import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../constants/colors'

const DropdownItem = ({ value, onSelect }) => {
	return (
		<Pressable
			onPress={onSelect}
			style={({ pressed }) => [
				styles.container,
				pressed ? styles.itemPressed : null,
			]}
			android_ripple={{ color: Colors.grey300 }}
		>
			<Text style={styles.optionText}>{value}</Text>
		</Pressable>
	)
}

export default DropdownItem

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: '80%',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary400,
	},
	optionText: {
		fontSize: 20,
		color: Colors.primary500,
		fontFamily: 'Lato_400Regular',
	},
	itemPressed: {
		opacity: 0.6,
	},
})

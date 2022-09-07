import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'

const PrimaryButton = ({
	children,
	onPress,
	backgroundColor = Colors.primary500,
	color = 'white',
}) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) =>
				pressed
					? [
							styles.buttonContainer,
							{ backgroundColor: backgroundColor },
							styles.pressed,
					  ]
					: [styles.buttonContainer, { backgroundColor: backgroundColor }]
			}
			android_ripple={{ color: '#ccc' }}
		>
			<View style={styles.innerContainer}>
				<Text style={[styles.buttonText, { color: color }]}>{children}</Text>
			</View>
		</Pressable>
	)
}

export default PrimaryButton

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 100,
		margin: 4,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	innerContainer: {
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	pressed: {
		opacity: 0.7,
	},
	buttonText: {
		fontSize: 16,
	},
})

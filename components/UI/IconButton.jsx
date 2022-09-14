import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'

const IconButton = ({
	name,
	size = 24,
	onPress,
	backgroundColor,
	color = Colors.primary500,
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
				<Ionicons name={name} color={color} size={size} />
			</View>
		</Pressable>
	)
}

export default IconButton

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 100,
		height: 32,
		width: 32,
		margin: 4,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	pressed: {
		opacity: 0.7,
	},
})

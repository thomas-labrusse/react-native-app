import { View, Pressable, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constants/colors'
import { categoriesIcons } from '../../constants/categories'

const HabitItem = ({ habit }) => {
	const { id, category, description, reps, frequency } = habit

	const navigation = useNavigation()

	const selectHabitHandler = () => {
		navigation.navigate('My Habit', {
			habitId: id,
		})
	}

	return (
		<Pressable
			onPress={selectHabitHandler}
			android_ripple={{ color: Colors.grey300 }}
			style={({ pressed }) => [
				styles.container,
				pressed ? styles.itemPressed : null,
			]}
		>
			<View style={styles.contentContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{description}</Text>
				</View>
				<View style={styles.frequencyIconContainer}>
					<View>
						<Text style={styles.frequencyIconText}>{reps} x</Text>
					</View>
					<Text style={styles.frequencyIconText}>{frequency}</Text>
				</View>
				<View style={styles.iconContainer}>
					<Ionicons
						name={categoriesIcons[category]}
						color={Colors.primary500}
						size='24'
					/>
				</View>
			</View>
		</Pressable>
	)
}

export default HabitItem

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.primary300,
		marginBottom: 10,
		borderRadius: 4,
		elevation: 4,
		shadowColor: 'black',
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 2,
	},
	itemPressed: {
		opacity: 0.6,
	},
	contentContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textContainer: {
		flex: 6,
		padding: 8,
	},
	text: {
		fontSize: 16,
		color: Colors.primary500,
	},
	frequencyIconContainer: {
		flex: 1,
		padding: 8,
		height: '100%',
		backgroundColor: Colors.primary300,
		alignItems: 'center',
		justifyContent: 'center',
		borderLeftWidth: 1,
		borderLeftColor: 'white',
		// borderTopRightRadius: 4,
		// borderBottomRightRadius: 4,
	},
	frequencyIconText: {
		fontSize: 10,
		color: Colors.primary500,
	},
	iconContainer: {
		flex: 1,
		padding: 8,
		height: '100%',
		backgroundColor: Colors.primary300,
		alignItems: 'center',
		justifyContent: 'center',
		borderLeftWidth: 1,
		borderLeftColor: 'white',
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
	},
})

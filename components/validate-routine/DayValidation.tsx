import React, { useContext } from 'react'
import {
	View,
	StyleSheet,
	Text,
	Pressable,
	LayoutAnimation,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'
import { RoutineContext } from '../../store/routine-context'
import { stringDateToDay } from '../../utils/dates'

// const LayoutAnimationConfig = {
// 	duration: 300,
// 	update: {
// 		type: LayoutAnimation.Types.easeInEaseOut,
// 	},
// 	delete: {
// 		duration: 100,
// 		type: LayoutAnimation.Types.easeInEaseOut,
// 		property: LayoutAnimation.Properties.opacity,
// 	},
// }

const DayValidation = ({
	habitId,
	date,
}: {
	habitId: string
	date: string
	description: string
}) => {
	const routineContext = useContext(RoutineContext)

	const onCheckHandler = () => {
		const input = { [date]: true }
		console.log(input)
		routineContext.validateHabit(habitId, input)
	}

	const onFailHandler = () => {
		const input = { [date]: false }
		console.log(input)
		routineContext.validateHabit(habitId, input)
		// LayoutAnimation.configureNext(LayoutAnimationConfig)
	}

	return (
		<View style={styles.container}>
			<Pressable
				onPress={onFailHandler}
				style={({ pressed }) =>
					pressed ? [styles.failButton, styles.pressed] : styles.failButton
				}
			>
				<Ionicons name='close-outline' color='white' size={24} />
			</Pressable>
			<View style={styles.textContainer}>
				<Text style={styles.text}>{stringDateToDay(date)}</Text>
			</View>
			<Pressable
				onPress={onCheckHandler}
				style={({ pressed }) =>
					pressed ? [styles.checkButton, styles.pressed] : styles.checkButton
				}
			>
				<Ionicons name='checkmark-outline' color='white' size={24} />
			</Pressable>
		</View>
	)
}

export default DayValidation

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 8,
		marginHorizontal: 12,
		backgroundColor: Colors.grey100,
		borderRadius: 6,
	},

	failButton: {
		flex: 1,
		paddingVertical: 6,
		alignItems: 'center',
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,
		backgroundColor: Colors.warning,
	},
	textContainer: {
		flex: 3,
		alignItems: 'center',
	},
	text: {
		fontSize: 14,
		color: Colors.grey400,
	},
	checkButton: {
		flex: 1,
		paddingVertical: 6,
		alignItems: 'center',
		borderTopRightRadius: 6,
		borderBottomRightRadius: 6,
		backgroundColor: Colors.check,
	},
	pressed: {
		opacity: 0.7,
	},
})

import { useState, useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import IconButton from '../UI/IconButton'
import { Colors } from '../../constants/colors'
import { RoutineContext } from '../../store/routine-context'

const ValidateHabitInput = ({ habitId, description, date, reps }) => {
	const [repsInput, setRepsInput] = useState(reps)
	// const [validationInput, setValidationInput] = useState({
	// 	check: true,
	// 	reps: reps,
	// })

	const routineContext = useContext(RoutineContext)

	const handleChangeInput = (direction) => {
		const reps = +repsInput
		// const reps = Number(validationInput.reps)
		switch (direction) {
			case 'increment':
				console.log('Incrementing')
				setRepsInput(reps + 1)
				// setValidationInput({ ...validationInput, reps: reps + 1 })
				break
			case 'decrement':
				console.log('Decrementing')
				if (reps === 0) return
				setRepsInput(reps - 1)
				// setValidationInput({ ...validationInput, reps: reps - 1 })
				break
		}
	}

	const onSubmit = () => {
		routineContext.validateHabit(habitId, date, repsInput)
		// routineContext.validateHabit(habitId, date, validationInput)
		console.log('Date :', date)
		console.log('Validation input :', repsInput)
	}

	return (
		<View style={styles.container}>
			<Text>{date}</Text>
			<View style={styles.commandsContainer}>
				<IconButton
					name={'remove-outline'}
					size={24}
					backgroundColor={Colors.primary500}
					color={'white'}
					onPress={handleChangeInput.bind(this, 'decrement')}
				/>
				<Text>{repsInput}</Text>
				{/* <Text>{validationInput.reps}</Text> */}
				<IconButton
					name={'add-outline'}
					size={24}
					backgroundColor={Colors.primary500}
					color={'white'}
					onPress={handleChangeInput.bind(this, 'increment')}
				/>
			</View>
			<Button title='Submit' onPress={onSubmit} />
		</View>
	)
}

export default ValidateHabitInput

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: Colors.grey100,
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginVertical: 8,
	},
	commandsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
})

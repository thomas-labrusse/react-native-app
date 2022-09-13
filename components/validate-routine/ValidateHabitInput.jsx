import { useState, useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import DaySelect from './DaySelect'
import { Colors } from '../../constants/colors'
import { RoutineContext } from '../../store/routine-context'

const ValidateHabitInput = ({ habitId, description, dates }) => {
	const [validationInput, setValidationInput] = useState(() => {
		const initialState = {}
		dates.forEach((date) => (initialState[date] = false))
		return initialState
	})

	const routineContext = useContext(RoutineContext)

	const daySelectHandler = (date) => {
		const curStatus = validationInput[date]
		setValidationInput((prev) => {
			return { ...prev, [date]: !curStatus }
		})
	}

	const onSubmit = () => {
		routineContext.validateHabit(habitId, validationInput)
	}

	return (
		<View style={styles.container}>
			<Text>{description}</Text>
			<View style={styles.innerContainer}>
				<View style={styles.datesContainer}>
					{dates.map((date) => (
						<DaySelect
							key={date}
							date={date}
							selectDay={daySelectHandler.bind(this, date)}
							backgroundColor={
								validationInput[date] ? Colors.primary500 : 'white'
							}
							color={validationInput[date] ? 'white' : Colors.grey300}
						/>
					))}
				</View>
				<Button title='Submit' onPress={onSubmit} />
			</View>
		</View>
	)
}

export default ValidateHabitInput

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.grey100,
	},
	innerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginVertical: 8,
	},
	datesContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
})

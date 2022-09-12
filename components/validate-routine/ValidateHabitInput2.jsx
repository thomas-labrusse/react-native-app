import { useState, useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import IconButton from '../UI/IconButton'
import DaySelect from './DaySelect'
import { Colors } from '../../constants/colors'
import { RoutineContext } from '../../store/routine-context'

const ValidateHabitInput2 = ({ habitId, description, dates }) => {
	// TODO: initialize state with dates set on "false"
	const [input, setInput] = useState({
		'2022-09-10': false,
		'2022-09-11': true,
		'2022-09-12': false,
	})

	const routineContext = useContext(RoutineContext)

	const daySelectHandler = (date) => {
		const curStatus = input[date]
		setInput((prev) => {
			return { ...prev, [date]: !curStatus }
		})
	}

	const onSubmit = () => {
		routineContext.validateHabit2(habitId, dates, repsInput)
		// routineContext.validateHabit(habitId, date, validationInput)
		console.log('Dates :', dates)
		console.log('Validation input :', input)
	}

	return (
		<View style={styles.container}>
			<Text>{description}</Text>
			<View style={styles.innerContainer}>
				<View style={styles.datesContainer}>
					{dates.map((date) => (
						<DaySelect
							date={date}
							selectDay={daySelectHandler.bind(this, date)}
							backgroundColor={input[date] ? Colors.primary500 : 'white'}
							color={input[date] ? 'white' : Colors.grey300}
						/>
					))}
				</View>
				<Button title='Submit' onPress={onSubmit} />
			</View>
		</View>
	)
}

export default ValidateHabitInput2

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

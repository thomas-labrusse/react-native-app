import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getLastXDates } from '../../utils/dates'
import { parseValidations } from '../../utils/utils'
import CalendarDay from './CalendarDay'

const lastXDates = getLastXDates(28)

const CalendarValidations = ({ habitId, validations }) => {
	const [calendar, setCalendar] = useState()

	const parsedValidations = parseValidations(validations)
	console.log('Parsed Validations : ', parsedValidations)
	console.log('last 28 days:', lastXDates)

	let calendare = []
	lastXDates.forEach((date) => {
		calendare.push({ [date]: 'unchecked' })
	})

	console.log('Calendare:', calendare)

	// TODO: improve function to create a 28 days calendar with all checks and unchecked
	calendare.forEach((date, id) => {
		if (Object.keys(parsedValidations).includes(Object.keys(date)[0])) {
			calendare[id] = { [date]: parsedValidations[date] }
		}
	})

	console.log('Calendare:', calendare)

	return (
		<>
			<Text>Calendar:</Text>
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					{validations.map((validation) => (
						<CalendarDay
							key={validation.validationdate}
							date={validation.validationdate}
							check={validation.validationcheck}
						/>
					))}
				</View>
			</View>
		</>
	)
}

export default CalendarValidations

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: 'green',
	},
	innerContainer: {
		// flex: 1,
		// backgroundColor: 'grey',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
})

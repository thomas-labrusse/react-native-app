import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
	parseValidationsLastXDates,
	parseValidationsByWeeks,
} from '../../utils/utils'
import InputLabel from '../manage-habit/InputLabel'
import CurrentStreak from './CurrentStreak'
import MaxStreak from './MaxStreak'
import SuccessRate from './SuccessRate'
import WeekCalendar from './WeekCalendar'

const WeeklyStats = ({ validations, start, reps }) => {
	const [allValidations, setAllValidations] = useState([[]])

	useEffect(() => {
		const parsedValidationsByWeeks = parseValidationsByWeeks(
			7,
			validations,
			start
		)
		setAllValidations(parsedValidationsByWeeks)
	}, [validations])

	return (
		<>
			<View style={styles.container}>
				<View style={styles.statsContainer}>
					<InputLabel label='Current Streak' />
					<CurrentStreak validations={allValidations} />
					<InputLabel label='Success Rate' />
					<SuccessRate validations={allValidations} />
					<InputLabel label='Max Streak' />
					<MaxStreak validations={allValidations} />
				</View>
				<View style={styles.calendarContainer}>
					<InputLabel label='Last 4 weeks' />
					<WeekCalendar validationsByWeek={allValidations} reps={reps} />
				</View>
			</View>
		</>
	)
}

export default WeeklyStats

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginVertical: 12,
		justifyContent: 'space-around',
	},
	statsContainer: {
		alignItems: 'center',
	},
	calendarContainer: {
		alignItems: 'center',
	},
})

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { parseValidationsByWeeks } from '../../utils/utils'
import InputLabel from '../manage-habit/InputLabel'
import WeekCalendar from './WeekCalendar'
import { Colors } from '../../constants/colors'

import {
	getCurrentWeekStreak,
	getMaxWeekStreak,
	getWeekSuccessRate,
} from '../../utils/stats'

const WeeklyStats = ({ validations, start, reps }) => {
	const [allValidations, setAllValidations] = useState([[]])

	console.log('allValidations:', allValidations)

	useEffect(() => {
		const parsedValidationsByWeeks = parseValidationsByWeeks(
			7,
			validations,
			start
		)
		setAllValidations(parsedValidationsByWeeks)
	}, [validations])

	const currentStreak = getCurrentWeekStreak(allValidations, reps)
	const maxStreak = getMaxWeekStreak(allValidations, reps)
	const successRate = getWeekSuccessRate(allValidations, reps)

	return (
		<>
			<View style={styles.container}>
				<View style={styles.statsContainer}>
					<InputLabel label='Current Streak' />
					<Text style={styles.text}>{currentStreak}</Text>
					<InputLabel label='Max Streak' />
					<Text style={styles.text}>{maxStreak}</Text>
					<InputLabel label='Success Rate' />
					<Text style={styles.text}>{successRate}%</Text>
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
	text: {
		color: Colors.primary500,
	},
})

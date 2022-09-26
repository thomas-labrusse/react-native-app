import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { parseValidationsLastXDates } from '../../utils/utils'
import InputLabel from '../manage-habit/InputLabel'
import DayBlock from './DayBlock'
import { Colors } from '../../constants/colors'

import {
	getCurrentStreak,
	getMaxStreak,
	getSuccessRate,
} from '../../utils/stats'

const DailyStats = ({ validations, start }) => {
	const [allValidations, setAllValidations] = useState([{}])

	// console.log('All validations :', allValidations)

	useEffect(() => {
		const parsedValidations = parseValidationsLastXDates(28, validations, start)
		setAllValidations(parsedValidations)
	}, [validations])

	const currentStreak = getCurrentStreak(allValidations)
	const maxStreak = getMaxStreak(allValidations)
	const successRate = getSuccessRate(allValidations)

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
					<InputLabel label={`Last ${allValidations.length} days`} />
					<View style={styles.calendar}>
						{allValidations.map((date, index) => (
							<DayBlock
								key={date.validationdate || index.toString()}
								date={date.validationdate}
								check={date.validationcheck}
							/>
						))}
					</View>
				</View>
			</View>
		</>
	)
}

export default DailyStats

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginVertical: 12,
		justifyContent: 'space-around',
	},
	statsContainer: {
		flex: 1,
		alignItems: 'center',
	},
	calendarContainer: {
		flex: 1,
		alignItems: 'center',
	},
	calendar: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	text: {
		color: Colors.primary500,
		fontFamily: 'Lato_400Regular',
	},
})

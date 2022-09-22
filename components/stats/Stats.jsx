import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { parseValidationsLastXDates } from '../../utils/utils'
import InputLabel from '../manage-habit/InputLabel'
import CurrentStreak from './CurrentStreak'
import MaxStreak from './MaxStreak'
import SuccessRate from './SuccessRate'
import DayBlock from './DayBlock'
import WeekBlock from './WeekBlock'
import DailyStats from './DailyStats'
import WeeklyStats from './WeeklyStats'

const Stats = ({ frequency, validations, start, reps }) => {
	// const [allValidations, setAllValidations] = useState([{}])

	// useEffect(() => {
	// 	const parsedValidations = parseValidationsLastXDates(28, validations, start)
	// 	setAllValidations(parsedValidations)
	// }, [validations])

	return (
		<View style={styles.container}>
			{frequency === 'day' ? (
				<DailyStats validations={validations} start={start} />
			) : (
				<WeeklyStats validations={validations} start={start} reps={reps} />
			)}
		</View>
	)
}

export default Stats

const styles = StyleSheet.create({
	container: {
		marginTop: 12,
	},
})

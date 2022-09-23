import React from 'react'
import { View, StyleSheet } from 'react-native'
import DailyStats from './DailyStats'
import WeeklyStats from './WeeklyStats'

const Stats = ({ frequency, validations, start, reps }) => {
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

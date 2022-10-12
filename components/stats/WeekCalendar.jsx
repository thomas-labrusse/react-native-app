import React from 'react'
import { View, StyleSheet } from 'react-native'
import { checkIsWeekValidated } from '../../utils/stats'
import WeekBlock from './WeekBlock'

const WeekCalendar = ({ validationsByWeek, reps }) => {
	const renderWeekBlock = (weekValidations, index) => {
		let validated = checkIsWeekValidated(weekValidations, reps)
		return (
			<WeekBlock
				key={index.toString()}
				weekValidations={weekValidations}
				validated={validated}
			/>
		)
	}
	return (
		<View style={styles.container}>
			{validationsByWeek.map(renderWeekBlock)}
		</View>
	)
}

export default WeekCalendar

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
})

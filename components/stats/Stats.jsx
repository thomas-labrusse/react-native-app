import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { parseValidationsLastXDates } from '../../utils/utils'
import CalendarDay from './CalendarDay'
import InputLabel from '../manage-habit/InputLabel'
import CurrentStreak from './CurrentStreak'
import MaxStreak from './MaxStreak'
import SuccessRate from './SuccessRate'

const Stats = ({ validations, start }) => {
	const [allValidations, setAllValidations] = useState([{}])

	console.log('All validations :', allValidations)

	useEffect(() => {
		const parsedValidations = parseValidationsLastXDates(28, validations, start)
		setAllValidations(parsedValidations)
	}, [validations])

	return (
		<>
			<InputLabel label='Current Streak' />
			<CurrentStreak validations={allValidations} />
			<InputLabel label='Success Rate' />
			<SuccessRate validations={allValidations} />
			<InputLabel label='Max Streak' />
			<MaxStreak validations={allValidations} />
			<InputLabel label='Last 4 weeks' />
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					{allValidations.map((date) => (
						<CalendarDay
							key={date.validationdate}
							date={date.validationdate}
							check={date.validationcheck}
						/>
					))}
				</View>
			</View>
		</>
	)
}

export default Stats

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	innerContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
})

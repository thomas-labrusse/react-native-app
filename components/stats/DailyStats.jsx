import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { parseValidationsLastXDates } from '../../utils/utils'
import InputLabel from '../manage-habit/InputLabel'
import CurrentStreak from './CurrentStreak'
import MaxStreak from './MaxStreak'
import SuccessRate from './SuccessRate'
import DayBlock from './DayBlock'

const DailyStats = ({ validations, start }) => {
	const [allValidations, setAllValidations] = useState([{}])

	// console.log('All validations :', allValidations)

	useEffect(() => {
		const parsedValidations = parseValidationsLastXDates(28, validations, start)
		setAllValidations(parsedValidations)
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
})

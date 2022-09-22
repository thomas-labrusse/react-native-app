import React from 'react'
import { StyleSheet, View } from 'react-native'
import DayBlock from './DayBlock'
import { Colors } from '../../constants/colors'

const WeekBlock = ({ weekValidations, validated }) => {
	return (
		<View
			style={
				validated
					? [styles.container, styles.validated]
					: [styles.container, styles.failed]
			}
		>
			{weekValidations.map((date, index) => (
				<DayBlock
					key={index.toString()}
					date={date.validationdate}
					check={date.validationcheck}
				/>
			))}
		</View>
	)
}

export default WeekBlock

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		borderWidth: 2,
		borderStyle: 'dotted',
		marginHorizontal: 5,
		padding: 1,
		borderRadius: 3,
	},
	validated: {
		borderColor: Colors.check600,
	},
	failed: {
		borderColor: Colors.warning600,
	},
})

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../../constants/colors'

const CalendarDay = ({ check }) => {
	let status
	switch (check) {
		case 'true':
			status = 'checked'
			break
		case 'false':
			status = 'failed'
			break
		case 'unchecked':
			status = 'unchecked'
			break

		default:
			break
	}
	return (
		<View style={styles.container}>
			<View style={styles[status]}></View>
		</View>
	)
}

export default CalendarDay

const styles = StyleSheet.create({
	container: {
		width: 30,
		height: 30,
		margin: 4,
		borderRadius: 3,
		overflow: true,
	},
	checked: {
		flex: 1,
		backgroundColor: Colors.check,
	},
	failed: {
		flex: 1,
		backgroundColor: Colors.warning,
	},
	unchecked: {
		flex: 1,
		backgroundColor: Colors.unchecked,
	},
})

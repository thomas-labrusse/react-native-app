import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Colors } from '../../constants/colors'

const CalendarDay = ({ date, check }) => {
	const isChecked = check === 'true'
	return (
		<View style={styles.container}>
			<View style={isChecked ? styles.checked : styles.failed}></View>
		</View>
	)
}

export default CalendarDay

const styles = StyleSheet.create({
	container: {
		width: 40,
		height: 40,
		margin: 4,
	},
	checked: {
		flex: 1,
		backgroundColor: Colors.check,
	},
	failed: {
		flex: 1,
		backgroundColor: Colors.warning,
	},
})

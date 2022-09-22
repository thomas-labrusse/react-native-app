import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../../constants/colors'

const DayBlock = ({ check }) => {
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

export default DayBlock

const styles = StyleSheet.create({
	container: {
		width: 25,
		height: 25,
		margin: 2,
		borderRadius: 3,
		overflow: true,
	},
	checked: {
		flex: 1,
		backgroundColor: Colors.check400,
	},
	failed: {
		flex: 1,
		backgroundColor: Colors.warning400,
	},
	unchecked: {
		flex: 1,
		backgroundColor: Colors.unchecked400,
	},
})

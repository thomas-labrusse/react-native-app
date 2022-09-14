import React, { useState, useContext } from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import { Colors } from '../../constants/colors'
import { RoutineContext } from '../../store/routine-context'
import { stringDateToDay } from '../../utils/dates'
import IconButton from '../UI/IconButton'

const DayValidation = ({
	habitId,
	date,
	description,
}: {
	habitId: string
	date: string
	description: string
}) => {
	const routineContext = useContext(RoutineContext)

	const onCheckHandler = () => {
		const input = { [date]: true }
		console.log(input)
		routineContext.validateHabit(habitId, input)
	}

	const onFailHandler = () => {
		const input = { [date]: false }
		console.log(input)
		routineContext.validateHabit(habitId, input)
	}

	return (
		<View style={styles.container}>
			<IconButton
				name='close-outline'
				onPress={onFailHandler}
				backgroundColor={Colors.warning}
				color='white'
			/>
			<Text>{stringDateToDay(date)}</Text>
			<IconButton
				name='checkmark-outline'
				onPress={onCheckHandler}
				backgroundColor={Colors.check}
				color='white'
			/>
		</View>
	)
}

export default DayValidation

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginVertical: 6,
		marginHorizontal: 12,
		backgroundColor: Colors.grey100,
	},
})

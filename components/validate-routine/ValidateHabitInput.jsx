import { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import IconButton from '../UI/IconButton'
import { Colors } from '../../constants/colors'

const ValidateHabitInput = ({ habitId, description, date, reps }) => {
	const [validationInput, setValidationInput] = useState({
		date: date,
		check: true,
		reps: reps,
	})

	const handleChangeInput = (direction) => {
		const reps = Number(validationInput.reps)
		switch (direction) {
			case 'increment':
				console.log('Incrementing')
				setValidationInput({ ...validationInput, reps: reps + 1 })
				break
			case 'decrement':
				console.log('Decrementing')
				if (reps === 0) return
				setValidationInput({ ...validationInput, reps: reps - 1 })
				break
		}
	}

	const onSubmit = () => {
		console.log('Validation input :', validationInput)
	}

	return (
		<View style={styles.container}>
			{/* <Text>{habitId}</Text> */}
			<IconButton
				name={'remove-outline'}
				size={24}
				backgroundColor={Colors.primary500}
				color={'white'}
				onPress={handleChangeInput.bind(this, 'decrement')}
			/>
			<Text>{validationInput.reps}</Text>
			<IconButton
				name={'add-outline'}
				size={24}
				backgroundColor={Colors.primary500}
				color={'white'}
				onPress={handleChangeInput.bind(this, 'increment')}
			/>
			<Button title='Submit' onPress={onSubmit} />
		</View>
	)
}

export default ValidateHabitInput

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
})

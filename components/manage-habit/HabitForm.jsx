import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import PrimaryButton from '../UI/PrimaryButton'
import Input from '../UI/Input'
import Dropdown from './dropdown/Dropdown'
import { Colors } from '../../constants/colors'
import { RoutineContext } from '../../store/routine-context'
import InputLabel from './InputLabel'
import { dateToISOStringNoTime } from '../../utils/dates'

const Categories = [
	{ id: 1, value: 'productivity' },
	{ id: 2, value: 'health' },
	{ id: 3, value: 'family/friends' },
]

const WeekReps = [
	{ id: 1, value: 1 },
	{ id: 2, value: 2 },
	{ id: 3, value: 3 },
	{ id: 4, value: 4 },
	{ id: 5, value: 5 },
	{ id: 6, value: 6 },
]

const Frequencies = [
	{ id: 1, value: 'day' },
	{ id: 2, value: 'week' },
]

const today = dateToISOStringNoTime(new Date())

const initialValues = {
	description: '',
	why: '',
	category: Categories[0],
	reps: WeekReps[0],
	frequency: Frequencies[0],
	start: today,
}

const HabitForm = ({
	submitButtonLabel,
	isEditing,
	onCancel,
	defaultValues,
}) => {
	const [inputs, setInputs] = useState({
		habitid: defaultValues && defaultValues.habitid,
		description: defaultValues
			? defaultValues.description
			: initialValues.description,
		why: defaultValues ? defaultValues.why : initialValues.why,
		category: defaultValues
			? defaultValues.category
			: initialValues.category.value,
		reps: defaultValues ? defaultValues.reps : initialValues.reps.value,
		frequency: defaultValues
			? defaultValues.frequency
			: initialValues.frequency.value,
		start: defaultValues ? defaultValues.start : initialValues.start,
	})

	const routineContext = useContext(RoutineContext)

	const inputChangeHandler = (inputIdentifier, text) => {
		setInputs((curInputs) => {
			return {
				...curInputs,
				[inputIdentifier]: text,
			}
		})
	}
	const categoryChangeHandler = (category) => {
		setInputs((curInputs) => {
			return {
				...curInputs,
				category: category,
			}
		})
	}

	const dayFrequencyChangeHandler = () => {
		setInputs((curInputs) => {
			return {
				...curInputs,
				frequency: 'day',
				reps: 1,
			}
		})
	}

	const confirmHandler = () => {
		const validDescription = inputs.description.trim().length > 0
		const validWhy = inputs.why.trim().length > 0
		if (!validDescription) {
			Alert.alert(
				'Invalid input',
				'Include a description of you habit to save it.'
			)
			return
		} else if (!validWhy) {
			Alert.alert(
				'Invalid input',
				'Why are you trying to implement that new habit in your routine ?'
			)
			return
		} else if (isEditing) {
			routineContext.updateHabit(inputs.habitid, inputs)
			onCancel()
		} else {
			routineContext.createHabit(inputs)
			setInputs(defaultValues)
			onCancel()
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputsContainer}>
				<InputLabel label='My habit' />
				<Input
					textInputConfig={{
						placeholder: 'Wake up at 6am ...',
						maxLength: 80,
						returnKeyType: 'done',
						multiline: true,
						blurOnSubmit: true,
						value: inputs.description,
						onChangeText: inputChangeHandler.bind(this, 'description'),
					}}
				/>
				<InputLabel label='Why including it in my routine' />
				<Input
					textInputConfig={{
						placeholder: 'To feel great !',
						maxLength: 80,
						returnKeyType: 'done',
						multiline: true,
						blurOnSubmit: true,
						value: inputs.why,
						onChangeText: inputChangeHandler.bind(this, 'why'),
					}}
				/>
				<InputLabel label='Category' />
				<Dropdown
					values={Categories}
					onSelectItem={(index) =>
						categoryChangeHandler(Categories[index].value)
					}
					initialOption={inputs.category}
				/>
				<View style={styles.seperator}></View>
				<InputLabel label='Frequency' />
				<View style={styles.frequencyContainer}>
					{inputs.frequency === 'week' && (
						<Dropdown
							values={WeekReps}
							onSelectItem={(index) =>
								inputChangeHandler('reps', WeekReps[index].value)
							}
							initialOption={inputs.reps}
						/>
					)}
					<Text style={styles.unionText}>every</Text>
					<Dropdown
						values={Frequencies}
						onSelectItem={(index) => {
							if (Frequencies[index].value === 'day') {
								dayFrequencyChangeHandler()
							}
							inputChangeHandler('frequency', Frequencies[index].value)
						}}
						initialOption={inputs.frequency}
					/>
				</View>
			</View>
			<View style={styles.buttonsContainer}>
				<PrimaryButton
					backgroundColor={Colors.primary500}
					color='white'
					onPress={onCancel}
				>
					Cancel
				</PrimaryButton>
				<PrimaryButton
					backgroundColor={Colors.primary500}
					color='white'
					onPress={confirmHandler}
				>
					{submitButtonLabel}
				</PrimaryButton>
			</View>
		</View>
	)
}

export default HabitForm

const styles = StyleSheet.create({
	container: {
		marginVertical: 40,
		marginHorizontal: 20,
		alignItems: 'center',
	},
	inputsContainer: {
		width: '100%',
		marginVertical: 8,
		marginBottom: 20,
	},
	seperator: {
		marginBottom: 16,
	},
	frequencyContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.primary100,
		borderColor: Colors.primary100,
		borderWidth: 1,
		borderRadius: 6,
	},
	unionText: {
		color: Colors.primary500,
		fontSize: 16,
		fontFamily: 'Lato_400Regular',
	},
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
})

import { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PrimaryButton from '../UI/PrimaryButton'
import Input from '../UI/Input'
import Dropdown from './dropdown/Dropdown'
import { Colors } from '../../constants/colors'
import { RoutineContext } from '../../store/routine-context'

const Categories = [
	{
		id: 1,
		value: 'productivity',
		icon: 'alarm-outline',
	},
	{ id: 2, value: 'health', icon: 'body-outline' },
	{
		id: 3,
		value: 'family/friends',
		icon: 'people-outline',
	},
]

const Reps = [
	{ id: 1, value: '1' },
	{ id: 2, value: '2' },
	{ id: 3, value: '3' },
	{ id: 4, value: '4' },
	{ id: 5, value: '5' },
]

const Frequencies = [
	{ id: 1, value: 'day' },
	{ id: 2, value: 'week' },
	{ id: 3, value: 'month' },
]

const initialValues = {
	id: '',
	description: '',
	why: '',
	category: Categories[0],
	reps: Reps[0],
	frequency: Frequencies[0],
	// icon: Categories[0].icon,
}

const HabitForm = ({
	submitButtonLabel,
	isEditing,
	onCancel,
	onSubmit,
	defaultValues,
}) => {
	const [inputs, setInputs] = useState({
		id: defaultValues ? defaultValues.id : initialValues.id,
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
		// icon: defaultValues ? defaultValues.icon : initialValues.icon,
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
	const categoryChangeHandler = (category, icon) => {
		setInputs((curInputs) => {
			return {
				...curInputs,
				category: category,
				icon: icon,
			}
		})
	}
	const confirmHandler = () => {
		if (isEditing) {
			console.log('Updating habit to routine with the following:', inputs)
			routineContext.updateHabit(inputs.id, inputs)
			onCancel()
		} else {
			console.log('Adding following habit to routine', inputs)
			routineContext.createHabit(inputs)
			setInputs(defaultValues)
			onCancel()
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputsContainer}>
				<Input
					label='My habit'
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
				<Input
					label='Why including it in my routine'
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
				{/* TODO: allow to select initial value for Dropdown component */}
				<Dropdown
					label={'Category'}
					values={Categories}
					onSelectItem={(index) =>
						categoryChangeHandler(
							Categories[index].value,
							Categories[index].icon
						)
					}
					initialOption={inputs.category}
				/>
				<View style={styles.frequencyContainer}>
					{/* TODO: allow to select initial value for Dropdown component */}
					<Dropdown
						// label={'Reps'}
						values={Reps}
						onSelectItem={(index) =>
							inputChangeHandler('reps', Reps[index].value)
						}
						initialOption={inputs.reps}
					/>
					<Text>every</Text>
					{/* TODO: allow to select initial value for Dropdown component */}
					<Dropdown
						// label={'Frequency'}
						values={Frequencies}
						onSelectItem={(index) =>
							inputChangeHandler('frequency', Frequencies[index].value)
						}
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
		marginBottom: 20,
	},
	frequencyContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textInput: {
		borderWidth: 1,
		borderColor: Colors.primary300,
		backgroundColor: Colors.primary300,
		color: Colors.primary500,
		borderRadius: 6,
		width: '100%',
		padding: 16,
		fontSize: 16,
	},
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
})

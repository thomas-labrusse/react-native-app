import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PrimaryButton from '../components/UI/PrimaryButton'
import { Ionicons } from '@expo/vector-icons'
import { RoutineContext } from '../store/routine-context'
import EditHabitModal from '../components/manage-habit/EditHabitModal'
import { Colors } from '../constants/colors'
import { categoriesIcons } from '../constants/categories'
import ValidateHabitInput from '../components/validate-routine/ValidateHabitInput'
import ValidateHabitInput2 from '../components/validate-routine/ValidateHabitInput2'
import { dateToString } from '../utils/dates'

const HabitDetailsScreen = ({ route, navigation }) => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const routineContext = useContext(RoutineContext)

	const selectedHabitId = route.params?.habitId

	const myHabit = routineContext.routine.find(
		(habit) => habit.id === selectedHabitId
	)

	const { description, category, why, frequency, reps } = myHabit

	const deleteHandler = () => {
		routineContext.deleteHabit(selectedHabitId)
		navigation.goBack()
	}

	const showModal = () => {
		setIsModalVisible((prev) => !prev)
	}
	const closeModal = () => {
		setIsModalVisible((prev) => !prev)
	}

	const today = dateToString(new Date(Date.now()))

	console.log('Today :', today)

	return (
		<View style={styles.container}>
			<EditHabitModal
				isVisible={isModalVisible}
				onClose={closeModal}
				myHabit={myHabit}
			/>
			<Text style={styles.title}>{description}</Text>
			<View style={styles.tagsContainer}>
				<View style={styles.tag}>
					<Ionicons
						name={categoriesIcons[category]}
						color={Colors.grey300}
						size='18'
						style={styles.tagIcon}
					/>
					<Text style={styles.tagText}>{category}</Text>
				</View>
				<View style={styles.tag}>
					<Text style={styles.tagText}>{reps} x</Text>
					<Text style={styles.tagText}> {frequency}</Text>
				</View>
			</View>
			<View style={styles.whyContainer}>
				<Text style={styles.whyText}>"{why}"</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<PrimaryButton
					backgroundColor={Colors.warning}
					color={'white'}
					onPress={deleteHandler}
				>
					Delete
				</PrimaryButton>
				<PrimaryButton
					backgroundColor={Colors.primary500}
					color={'white'}
					onPress={showModal}
				>
					Edit
				</PrimaryButton>
			</View>
			<View>
				<ValidateHabitInput
					habitId={selectedHabitId}
					date={today}
					reps={reps}
				/>
			</View>
			<View>
				<ValidateHabitInput2
					habitId={selectedHabitId}
					description={description}
					dates={['2022-09-10', '2022-09-11', '2022-09-12']}
				/>
			</View>
			{/* <Text>Id: {id}</Text> */}
		</View>
	)
}

export default HabitDetailsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 14,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: Colors.primary500,
		marginTop: 8,
		marginBottom: 20,
		textAlign: 'center',
	},
	tagsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 20,
	},
	tag: {
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: Colors.grey100,
		borderRadius: 50,
	},
	tagIcon: {
		marginRight: 6,
	},
	tagText: {
		fontSize: 12,
		color: Colors.grey400,
	},
	whyContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary400,
		borderRadius: 2,
		padding: 8,
		marginBottom: 28,
	},
	whyText: {
		fontSize: 18,
		fontWeight: '200',
		color: 'white',
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RoutineContext } from '../store/routine-context'
import EditHabitModal from '../components/manage-habit/EditHabitModal'
import { Colors } from '../constants/colors'
import { categoriesIcons } from '../constants/categories'
import IconButton from '../components/UI/IconButton'
import ValidationList from '../components/validate-routine/ValidationList'
import Stats from '../components/stats/Stats'
import { database } from '../data/database'
import PrimaryButton from '../components/UI/PrimaryButton'

const HabitDetailsScreen = ({ route, navigation }) => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [activeView, setActiveView] = useState('checks')
	const [validations, setValidations] = useState([{}])

	const routineContext = useContext(RoutineContext)

	const selectedHabitId = route.params?.habitid

	const myHabit = routineContext.routine.find(
		(habit) => habit.habitid === selectedHabitId
	)

	const { description, category, frequency, reps, start } = myHabit

	useEffect(() => {
		database.getValidations(selectedHabitId, setValidations)
	}, [])

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => {
				return (
					<IconButton
						name='trash-outline'
						onPress={deleteHandler}
						color='white'
						backgroundColor={Colors.warning}
						size='24'
					/>
				)
			},
			headerRight: () => {
				return (
					<IconButton
						name='pencil-outline'
						onPress={showModal}
						color='white'
						backgroundColor={Colors.primary500}
						size='24'
					/>
				)
			},
		})
	}, [navigation, deleteHandler])

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

	const toggleViews = (view) => {
		setActiveView(view)
	}

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
			<View style={styles.viewButtonsContainer}>
				<PrimaryButton
					onPress={toggleViews.bind(this, 'checks')}
					backgroundColor={
						activeView === 'checks' ? Colors.primary500 : 'white'
					}
					color={activeView === 'checks' ? 'white' : Colors.grey300}
				>
					Checks
				</PrimaryButton>
				<PrimaryButton
					onPress={toggleViews.bind(this, 'stats')}
					backgroundColor={activeView === 'stats' ? Colors.primary500 : 'white'}
					color={activeView === 'stats' ? 'white' : Colors.grey300}
				>
					Stats
				</PrimaryButton>
			</View>
			{activeView === 'checks' ? (
				<ValidationList
					habitId={selectedHabitId}
					validations={validations}
					setValidations={setValidations}
					start={start}
				/>
			) : (
				<Stats validations={validations} start={start} />
			)}
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
		fontSize: 22,
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
		backgroundColor: Colors.primary300,
		borderRadius: 2,
		padding: 8,
		marginBottom: 28,
	},
	whyText: {
		fontSize: 18,
		fontWeight: '200',
		color: Colors.primary500,
	},
	viewButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		borderTopWidth: 1,
		borderTopColor: Colors.grey100,
		paddingTop: 12,
	},
})

import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, FlatList, LayoutAnimation } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RoutineContext } from '../store/routine-context'
import EditHabitModal from '../components/manage-habit/EditHabitModal'
import { Colors } from '../constants/colors'
import { categoriesIcons } from '../constants/categories'
import { getLastSevenDates } from '../utils/dates'
import { filterValidations } from '../utils/utils'
import DayValidation from '../components/validate-routine/DayValidation'
import IconButton from '../components/UI/IconButton'

// LAYOUT ANIMATION
// Setup to allow Layout Animation on Android
if (
	Platform.OS === 'android' &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true)
}

const LayoutAnimationConfig = {
	duration: 100,
	update: {
		duration: 100,
		type: LayoutAnimation.Types.easeInEaseOut,
	},
	delete: {
		duration: 100,
		type: LayoutAnimation.Types.easeInEaseOut,
		property: LayoutAnimation.Properties.opacity,
		springDamping: 0.7,
	},
	create: {
		duration: 100,
		type: LayoutAnimation.Types.easeInEaseOut,
		property: LayoutAnimation.Properties.opacity,
	},
}

const lastSevenDates = getLastSevenDates()

const HabitDetailsScreen = ({ route, navigation }) => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [datesList, setDatesList] = useState(lastSevenDates)
	const routineContext = useContext(RoutineContext)

	const selectedHabitId = route.params?.habitId

	const myHabit = routineContext.routine.find(
		(habit) => habit.id === selectedHabitId
	)
	const { description, category, frequency, reps, validations } = myHabit

	useLayoutEffect(() => {
		const filteredDatesList = filterValidations(validations, [...datesList])
		// Animating list on item validation
		LayoutAnimation.configureNext(LayoutAnimationConfig)
		setDatesList(filteredDatesList)
	}, [validations])

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
			<FlatList
				style={styles.validationList}
				data={datesList}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<DayValidation
						habitId={selectedHabitId}
						description={description}
						date={item}
					/>
				)}
			/>
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
	validationList: {
		flex: 1,
		marginVertical: 12,
	},
})

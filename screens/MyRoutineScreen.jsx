import React, { useContext, useState, useLayoutEffect, useEffect } from 'react'
import { View, Text, StyleSheet, LayoutAnimation } from 'react-native'
import HabitsList from '../components/habit-list/HabitsList'
import { RoutineContext } from '../store/routine-context'
import { Colors } from '../constants/colors'
import AddHabitModal from '../components/manage-habit/AddHabitModal'

// IMPORT COMPONENTS
import PrimaryButton from '../components/UI/PrimaryButton'
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
	duration: 600,
	create: { type: 'linear', property: 'opacity' },
	update: { type: 'spring', springDamping: 0.4 },
	delete: { type: 'spring', property: 'opacity' },
}

// COMPONENT

const MyRoutineScreen = ({ navigation }) => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isSortMenuVisible, setIsSortMenuVisible] = useState(false)
	const [selectedSort, setSelectedSort] = useState('')
	const [selectedFilters, setSelectedFilters] = useState([])

	const routineContext = useContext(RoutineContext)
	const routine = routineContext.routine
	const [myRoutine, setMyRoutine] = useState(routine)

	useEffect(() => {
		setMyRoutine(routine)
	}, [routine])

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => {
				return (
					<IconButton
						name={'funnel-outline'}
						size='24'
						backgroundColor={Colors.grey100}
						color={Colors.grey300}
						onPress={() => {
							LayoutAnimation.configureNext(LayoutAnimationConfig)
							handleSortButtonPress()
						}}
					/>
				)
			},
			headerRight: () => {
				return (
					<View style={styles.addButtonContainer}>
						<IconButton
							name={'add-outline'}
							size='24'
							backgroundColor={Colors.primary500}
							color='white'
							onPress={handleAddButtonPress}
						/>
					</View>
				)
			},
		})
	}, [navigation, handleAddButtonPress, handleSortButtonPress])

	const showModal = () => {
		setIsModalVisible((prev) => !prev)
	}
	const closeModal = () => {
		setIsModalVisible((prev) => !prev)
	}

	const handleAddButtonPress = () => {
		showModal()
	}

	const handleSortButtonPress = () => {
		console.log('Sort button pressed !')
		setIsSortMenuVisible((prev) => !prev)
	}

	const applyFilter = (identifier) => {
		let newSelectedFilters =
			selectedFilters.length > 0 ? [...selectedFilters] : []

		// Remove filter if existing
		if (selectedFilters.length > 0 && selectedFilters.includes(identifier)) {
			newSelectedFilters = selectedFilters.filter(
				(filter) => filter !== identifier
			)
			// Add filter if not included
		} else {
			newSelectedFilters.push(identifier)
		}
		setSelectedFilters(newSelectedFilters)
	}

	const filterRoutine = () => {
		const filteredRoutine = [...routine].filter(
			(habit) => !selectedFilters.includes(habit.frequency)
		)
		// Sort habits if a sorting value is selected
		if (selectedSort) {
			const sortedRoutine = sortList(selectedSort, filteredRoutine)
			setMyRoutine(sortedRoutine)
		} else setMyRoutine(filteredRoutine)
	}

	const sortList = (identifier, list) => {
		const sortedList = [...list].sort((a, b) => {
			if (a[identifier] < b[identifier]) {
				return -1
			}
			if (a[identifier] > b[identifier]) {
				return 1
			}
		})
		return sortedList
	}

	const sortRoutine = (identifier) => {
		if (identifier === selectedSort) return
		const sortedRoutine = sortList(identifier, myRoutine)
		setSelectedSort(identifier)
		setMyRoutine(sortedRoutine)
	}

	useEffect(() => {
		filterRoutine()
	}, [selectedFilters])

	const RenderSortMenu = () => {
		return (
			isSortMenuVisible && (
				<View style={styles.sortMenuContainer}>
					<View style={styles.sortMenuSubContainerTop}>
						<Text>Filter</Text>
						<View style={styles.sortMenuButtonsContainer}>
							<PrimaryButton
								onPress={applyFilter.bind(this, 'day')}
								backgroundColor={
									!selectedFilters.includes('day') ? Colors.primary500 : 'white'
								}
								color={
									!selectedFilters.includes('day') ? 'white' : Colors.grey300
								}
							>
								day
							</PrimaryButton>
							<PrimaryButton
								onPress={applyFilter.bind(this, 'week')}
								backgroundColor={
									!selectedFilters.includes('week')
										? Colors.primary500
										: 'white'
								}
								color={
									!selectedFilters.includes('week') ? 'white' : Colors.grey300
								}
							>
								week
							</PrimaryButton>
						</View>
					</View>
					<View style={styles.sortMenuSubContainerBottom}>
						<Text>Sort by</Text>
						<View style={styles.sortMenuButtonsContainer}>
							<PrimaryButton
								onPress={sortRoutine.bind(this, 'category')}
								backgroundColor={
									selectedSort === 'category' ? Colors.primary500 : 'white'
								}
								color={selectedSort === 'category' ? 'white' : Colors.grey300}
							>
								cat.
							</PrimaryButton>
							<PrimaryButton
								onPress={sortRoutine.bind(this, 'frequency')}
								backgroundColor={
									selectedSort === 'frequency' ? Colors.primary500 : 'white'
								}
								color={selectedSort === 'frequency' ? 'white' : Colors.grey300}
							>
								freq.
							</PrimaryButton>
						</View>
					</View>
				</View>
			)
		)
	}

	return (
		<View style={styles.container}>
			<AddHabitModal isVisible={isModalVisible} onClose={closeModal} />
			<View style={styles.menuButtonContainer}></View>
			<RenderSortMenu />
			<HabitsList routine={myRoutine} />
		</View>
	)
}

export default MyRoutineScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	addButtonContainer: {
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	menuButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	sortMenuContainer: {
		justifyContent: 'space-between',
		backgroundColor: Colors.grey100,
		paddingVertical: 8,
		marginHorizontal: 12,
		marginTop: 8,
	},
	sortMenuSubContainerTop: {
		flexDirection: 'row',
		paddingHorizontal: 4,
		alignItems: 'center',
		paddingBottom: 8,
	},
	sortMenuSubContainerBottom: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 4,
	},
	sortMenuButtonsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginLeft: 6,
	},
})

import React, { useState, useEffect } from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Colors } from '../../constants/colors'
import { categoriesIcons } from '../../constants/categories'
import { database } from '../../data/database'
import { getCurrentWeek, parseValidationsLastXDates } from '../../utils/utils'
import { checkIsWeekValidated } from '../../utils/stats'
import ImageBackgroundWrapper from '../UI/ImageBackgroundWrapper'

const HabitItem = ({ habit }) => {
	const { habitid, category, description, reps, frequency, start } = habit
	const [lastSevenValidations, setLastSevenValidations] = useState([])
	const [isChecked, setIsChecked] = useState(false)

	// NOTE: used to force re-render whenever navigating back to the main Routine screen
	const isFocused = useIsFocused()

	const navigation = useNavigation()

	const selectHabitHandler = () => {
		navigation.navigate('My Habit', {
			habitid: habitid,
		})
	}

	const parseAndSetState = (validations) => {
		const parsedValidation = parseValidationsLastXDates(7, validations, start)
		setLastSevenValidations(parsedValidation)
	}

	const testIfChecked = (validations) => {
		if (validations.length <= 0) return
		if (frequency === 'day') {
			if (validations[0].validationcheck === 'true') {
				setIsChecked(true)
			}
		} else if (frequency === 'week') {
			console.log(
				'Checking the following validations for week check :',
				validations
			)
			const currentWeek = getCurrentWeek(validations)
			console.log('Current week for validation check :', currentWeek)
			const isWeekValidated = checkIsWeekValidated(currentWeek, reps)
			console.log('Is week checked:', isWeekValidated)
			setIsChecked(isWeekValidated)
		}
	}

	useEffect(() => {
		database.getXValidations(habitid, 7, parseAndSetState)
	}, [isFocused, setLastSevenValidations])

	useEffect(() => {
		testIfChecked(lastSevenValidations)
	}, [lastSevenValidations])

	return (
		<Pressable
			onPress={selectHabitHandler}
			android_ripple={{ color: Colors.grey300 }}
			style={({ pressed }) => [
				styles.container,
				isChecked && styles.isChecked,
				pressed ? styles.itemPressed : null,
			]}
		>
			<ImageBackgroundWrapper isChecked={isChecked}>
				<View style={styles.contentContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.text}>{description}</Text>
					</View>
					<View style={styles.frequencyIconContainer}>
						<View>
							<Text style={styles.frequencyIconText}>{reps} x</Text>
						</View>
						<Text style={styles.frequencyIconText}>{frequency}</Text>
					</View>
					<View style={styles.iconContainer}>
						<Ionicons
							name={categoriesIcons[category]}
							color={Colors.primary500}
							size='24'
						/>
					</View>
				</View>
			</ImageBackgroundWrapper>
		</Pressable>
	)
}

export default HabitItem

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 20,
		borderRadius: 4,
		elevation: 4,
		shadowColor: 'black',
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 2,
		backgroundColor: Colors.primary100,
	},
	itemPressed: {
		opacity: 0.6,
	},
	contentContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textContainer: {
		flex: 6,
		padding: 8,
		marginVertical: 10,
	},
	text: {
		fontSize: 16,
		fontFamily: 'Lato_400Regular',
		color: Colors.primary500,
	},
	frequencyIconContainer: {
		flex: 1,
		padding: 8,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderLeftWidth: 1,
		borderLeftColor: 'white',
	},
	frequencyIconText: {
		fontSize: 10,
		fontFamily: 'Lato_400Regular',
		color: Colors.primary500,
	},
	iconContainer: {
		flex: 1,
		padding: 8,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderLeftWidth: 1,
		borderLeftColor: 'white',
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
	},
	isChecked: { backgroundColor: Colors.check300 },
})

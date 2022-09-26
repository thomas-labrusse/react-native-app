import React, { useState, useLayoutEffect } from 'react'
import { View, Text, FlatList, StyleSheet, LayoutAnimation } from 'react-native'
import { database } from '../../data/database'
import NewDayValidation from './NewDayValidation'
import { filterUnvalidated } from '../../utils/utils'
import { getLastSevenDates, getLastXDates } from '../../utils/dates'
import { Colors } from '../../constants/colors'

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
// NOTE: development purpose only
const lastXDates = getLastXDates(31)

const ValidationList = ({ habitId, validations, setValidations, start }) => {
	const [unvalidatedDates, setUnvalidatedDates] = useState(lastXDates)

	console.log('Validations in ValidationList:', validations)

	useLayoutEffect(() => {
		const unvalidatedDatesList = filterUnvalidated(
			validations,
			[...unvalidatedDates],
			start
		)
		// Animating list on item validation
		LayoutAnimation.configureNext(LayoutAnimationConfig)
		setUnvalidatedDates(unvalidatedDatesList)
	}, [validations])

	const refreshValidations = () => {
		database.getValidations(habitId, setValidations)
	}

	const onValidate = async (habitId, input) => {
		await database.addValidationAsync(habitId, input, refreshValidations)
	}

	if (unvalidatedDates.length === 0) {
		return (
			<View style={styles.noCheckscontainer}>
				<Text style={styles.noChecksText}>All checks up to date 👌</Text>
			</View>
		)
	} else
		return (
			<FlatList
				style={styles.validationList}
				data={unvalidatedDates}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<NewDayValidation
						habitId={habitId}
						date={item}
						onValidate={onValidate}
					/>
				)}
			/>
		)
}

export default ValidationList

const styles = StyleSheet.create({
	noCheckscontainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noChecksText: {
		fontSize: 20,
		fontFamily: 'Lato_400Regular',
		color: Colors.primary500,
	},
	validationList: {
		flex: 1,
		marginVertical: 12,
	},
})

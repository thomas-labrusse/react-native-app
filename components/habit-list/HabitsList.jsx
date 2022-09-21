import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'

import HabitItem from './HabitItem'

const HabitsList = ({ routine }) => {
	const renderHabitItem = ({ item }) => {
		return (
			<View>
				<HabitItem habit={item} />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			{routine.length > 0 ? (
				<FlatList
					data={routine}
					keyExtractor={(item) => item.id}
					renderItem={renderHabitItem}
				/>
			) : (
				<View style={styles.noHabitsContainer}>
					<Text style={styles.noHabitsText}>
						No habits in your routine, or none matching your current filters.
						Add a new habit now 💪 !
					</Text>
				</View>
			)}
		</View>
	)
}

export default HabitsList

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 12,
		paddingHorizontal: 12,
	},
	noHabitsContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noHabitsText: {
		fontSize: 20,
		color: Colors.primary500,
	},
})

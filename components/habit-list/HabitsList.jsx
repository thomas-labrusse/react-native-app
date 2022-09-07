import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

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
			<FlatList
				data={routine}
				keyExtractor={(item) => item.id}
				renderItem={renderHabitItem}
			/>
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
})

import { Pressable, StyleSheet, View, Text } from 'react-native'
import { stringDateToDay } from '../../utils/dates'

const DaySelect = ({
	date,
	selectDay,
	color,
	backgroundColor,
}: {
	date: string
	selectDay: any
	color: string
	backgroundColor: string
}) => {
	return (
		<Pressable
			onPress={selectDay}
			style={[styles.container, { backgroundColor: backgroundColor }]}
		>
			<View>
				<Text style={{ color: color }}>{stringDateToDay(date)}</Text>
			</View>
		</Pressable>
	)
}

export default DaySelect

const styles = StyleSheet.create({
	container: {
		paddingVertical: 6,
		paddingHorizontal: 12,
	},
})

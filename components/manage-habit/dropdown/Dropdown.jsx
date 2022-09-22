import React, { useState } from 'react'
import {
	Modal,
	Pressable,
	View,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import DropdownItem from './DropdownItem'
import { Colors } from '../../../constants/colors'

const DATA = [
	{ id: 1, value: 'option 1' },
	{ id: 2, value: 'option 2' },
	{ id: 3, value: 'option 3' },
	{ id: 4, value: 'option 4' },
]

const Dropdown = ({ values = DATA, onSelectItem, initialOption }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState(initialOption)

	const handleDropdownPress = () => {
		console.log('Dropdown pressed')
		setIsDropdownOpen((prev) => !prev)
	}

	const handleSelectOption = (id) => {
		console.log('Option selected')
		setIsDropdownOpen((prev) => !prev)
		setSelectedOption(values[id - 1].value)
		onSelectItem(id - 1)
	}

	const renderItem = ({ item }) => (
		<DropdownItem
			value={item.value}
			onSelect={() => handleSelectOption(item.id)}
		/>
	)

	return (
		<>
			<View style={styles.container}>
				<Pressable
					onPress={handleDropdownPress}
					style={styles.dropdownContainer}
				>
					<Text style={styles.optionText}>{selectedOption}</Text>
					<Ionicons name={'chevron-down'} color={Colors.primary400} size='14' />
				</Pressable>
			</View>
			<Modal visible={isDropdownOpen} transparent={true} animationType={'fade'}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<FlatList
							data={values}
							renderItem={renderItem}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
				</View>
			</Modal>
		</>
	)
}

export default Dropdown

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 4,
	},
	dropdownContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		color: Colors.primary500,
		borderColor: Colors.primary100,
		borderWidth: 1,
		borderRadius: 6,
		padding: 8,
	},
	optionText: {
		overflow: 'hidden',
		color: Colors.primary500,
		marginRight: 8,
		fontSize: 16,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ffffffe4',
	},
	modalView: {
		alignItems: 'center',
	},
})

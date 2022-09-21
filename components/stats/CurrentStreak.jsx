import React from 'react'
import { Text } from 'react-native'
import { getCurrentStreak } from '../../utils/stats'

const CurrentStreak = ({ validations }) => {
	const currentStreak = getCurrentStreak(validations)

	return <Text>{currentStreak}</Text>
}

export default CurrentStreak

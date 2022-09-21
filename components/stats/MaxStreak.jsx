import React from 'react'
import { Text } from 'react-native'
import { getMaxStreak } from '../../utils/stats'

const MaxStreak = ({ validations }) => {
	const maxStreak = getMaxStreak(validations)

	return <Text>{maxStreak}</Text>
}

export default MaxStreak

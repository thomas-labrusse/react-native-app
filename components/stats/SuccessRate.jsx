import React from 'react'
import { Text } from 'react-native'
import { getSuccessRate } from '../../utils/stats'

const SuccessRate = ({ validations }) => {
	const successRate = getSuccessRate(validations)

	return <Text>{successRate}%</Text>
}

export default SuccessRate

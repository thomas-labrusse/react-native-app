export const getCurrentStreak = (
	validations: [
		{
			validationdate: string
			validationcheck: string
			validationid: number
			habitid: number
		}
	]
): number => {
	let currentStreak = 0
	console.log('Validation array :', validations)
	for (let i = 0; i < validations.length; i++) {
		if (validations[i].validationcheck === 'true') {
			currentStreak = currentStreak + 1
		} else break
	}
	return currentStreak
}

export const getMaxStreak = (
	validations: [
		{
			validationdate: string
			validationcheck: string
			validationid: number
			habitid: number
		}
	]
): number => {
	let maxStreak = 0
	let currentStreak = 0
	console.log('Validation array :', validations)
	for (let i = 0; i < validations.length; i++) {
		if (validations[i].validationcheck === 'true') {
			currentStreak = currentStreak + 1 //1 - 2 - 3
			if (currentStreak >= maxStreak) {
				console.log('going there')
				maxStreak = currentStreak //
			}
		} else {
			currentStreak = 0
		}
	}
	return maxStreak
}

export const getSuccessRate = (
	validations: [
		{
			validationdate: string
			validationcheck: string
			validationid: number
			habitid: number
		}
	]
): number => {
	let totalSuccesses = 0
	validations.forEach((date) => {
		if (date.validationcheck === 'true') {
			totalSuccesses = totalSuccesses + 1
		} else return
	})
	return Math.round((totalSuccesses / validations.length) * 100)
}

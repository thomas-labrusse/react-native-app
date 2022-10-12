// ############################# DAY STATS #############################

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
	for (let i = 0; i < validations.length; i++) {
		if (validations[i].validationcheck === 'true') {
			currentStreak = currentStreak + 1
			if (currentStreak >= maxStreak) {
				maxStreak = currentStreak
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

// ############################# WEEK STATS #############################

export const checkIsWeekValidated = (
	weekValidations: [
		{
			validationdate: string
			validationcheck: string
			validationid: number
			habitid: number
		}
	],
	reps: number
) => {
	let validationNb = 0
	weekValidations.forEach((date) => {
		if (date.validationcheck === 'true') {
			validationNb += 1
		}
	})
	return validationNb >= reps
}

export const getCurrentWeekStreak = (
	validations: [
		[
			{
				validationdate: string
				validationcheck: string
				validationid: number
				habitid: number
			}
		]
	],
	reps: number
): number => {
	let currentStreak = 0
	for (let i = 0; i < validations.length; i++) {
		if (checkIsWeekValidated(validations[i], reps)) {
			currentStreak = currentStreak + 1
		} else break
	}
	return currentStreak
}

export const getMaxWeekStreak = (
	validations: [
		[
			{
				validationdate: string
				validationcheck: string
				validationid: number
				habitid: number
			}
		]
	],
	reps: number
): number => {
	let maxStreak = 0
	let currentStreak = 0
	for (let i = 0; i < validations.length; i++) {
		if (checkIsWeekValidated(validations[i], reps)) {
			currentStreak = currentStreak + 1
			if (currentStreak >= maxStreak) {
				maxStreak = currentStreak
			}
		} else {
			currentStreak = 0
		}
	}
	return maxStreak
}

export const getWeekSuccessRate = (
	validations: [
		[
			{
				validationdate: string
				validationcheck: string
				validationid: number
				habitid: number
			}
		]
	],
	reps: number
): number => {
	let totalSuccesses = 0
	validations.forEach((validation) => {
		if (checkIsWeekValidated(validation, reps)) {
			totalSuccesses = totalSuccesses + 1
		} else return
	})
	return Math.round((totalSuccesses / validations.length) * 100)
}

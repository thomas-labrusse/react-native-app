import { getLastXDates, stringDateToDateObject } from './dates'

const filterFromStartingDate = (dates: string[], start: string) => {
	const filteredDates = dates.filter((date) => date.localeCompare(start) >= 0)
	return filteredDates
}

// NOTE: get all only the unchecked dates within a date range
export const filterUnvalidated = (
	validations: [
		{
			validationdate: string
			validationcheck: string
			validationid: number
			habitid: number
		}
	],
	dates: string[],
	start: string
): string[] => {
	const filteredDates = filterFromStartingDate(dates, start)
	if (validations.length > 0) {
		const parsedValidations = parseValidations(validations)
		return filteredDates.filter((date) => !(date in parsedValidations))
	} else return filteredDates
}

export const parseValidations = (
	validations: [
		{
			validationdate: string
			validationcheck: string
			validationid: number
			habitid: number
		}
	]
) => {
	const validationObject = {}
	validations.map((validation) => {
		validationObject[validation.validationdate] = validation.validationcheck
	})

	return validationObject
}

// NOTE: get all validations dates for the last "x" days, including unchecked dates
export const parseValidationsLastXDates = (
	nbrDays: number,
	validations: [
		{
			validationdate: string
			validationcheck: string
			validationid: number
			habitid: number
		}
	],
	start: string
) => {
	const dates = getLastXDates(nbrDays) // 2022-09-23 --> 2022-09-17
	const filteredDates = filterFromStartingDate(dates, start)
	let validationsDates = []
	validations.forEach((validation) =>
		validationsDates.push(validation.validationdate)
	)
	const uncheckedDates = filteredDates.filter(
		(date) => !validationsDates.includes(date)
	)

	let completeValidations = [...validations].filter((date, i) => {
		if (i < nbrDays && filteredDates.includes(date.validationdate)) return date
	})

	uncheckedDates.forEach((date) =>
		completeValidations.push({
			validationdate: date,
			validationcheck: 'unchecked',
			validationid: NaN,
			habitid: NaN,
		})
	)

	completeValidations.sort((a, b) =>
		b.validationdate.localeCompare(a.validationdate)
	)

	return completeValidations
}

const sliceIntoChunks = (arr, chunkSize: number) => {
	const res = []
	for (let i = 0; i < arr.length; i += chunkSize) {
		const chunk = arr.slice(i, i + chunkSize)
		res.push(chunk)
	}
	return res
}

export const parseValidationsByWeeks = (
	nbrWeeks: number,
	validations: [
		{
			validationdate: string
			validationcheck: string
			validationid: number
			habitid: number
		}
	],
	start: string
) => {
	// 1/ get all validations
	const completeValidations = parseValidationsLastXDates(
		nbrWeeks * 7,
		validations,
		start
	)

	// 2/ find id of first monday
	let firstMondayIndex
	for (let i = 0; i < 8; i++) {
		if (
			stringDateToDateObject(completeValidations[i].validationdate).getDay() ===
			1
		) {
			firstMondayIndex = i
			break
		}
	}
	// 3/ cut all validations in 2 to isolate the current week
	let currentWeek = []
	currentWeek.push(completeValidations.slice(0, firstMondayIndex + 1))
	const previousWeeks = completeValidations.splice(
		firstMondayIndex + 1,
		completeValidations.length
	)

	// 4/ cut the remaining weeks in 4 to get the complete weeks
	const previousWeeksArrays = sliceIntoChunks(previousWeeks, 7)

	// 5/ remove the last week of the previous segment (if incomplete week)
	if (previousWeeksArrays[previousWeeksArrays.length - 1].length < 7) {
		previousWeeksArrays.splice(-1, 1)
	}
	// 6/ concat all weeks
	const res = currentWeek.concat(previousWeeksArrays)
	return res
}

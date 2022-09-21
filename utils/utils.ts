import { getLastXDates } from './dates'

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
	console.log('Filtered dates :', filteredDates)
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
	const dates = getLastXDates(nbrDays)
	const filteredDates = filterFromStartingDate(dates, start)
	let validationsDates = []
	validations.forEach((validation) =>
		validationsDates.push(validation.validationdate)
	)
	const uncheckedDates = filteredDates.filter(
		(date) => !validationsDates.includes(date)
	)

	let completeValidations = [...validations].filter((date, i) => {
		if (i < nbrDays) return date
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

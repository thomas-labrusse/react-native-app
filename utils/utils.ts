export const filterUnvalidated = (
	validations: [
		{
			validationdate: string
			validationcheck: string
			validationid: number
			habitid: number
		}
	],
	dates: string[]
): string[] => {
	if (validations.length > 0) {
		const parsedValidations = parseValidations(validations)
		return dates.filter((date) => !(date in parsedValidations))
	} else return dates
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

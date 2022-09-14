export const filterValidations = (validations, dates) => {
	return dates.filter((date) => !(date in validations))
}

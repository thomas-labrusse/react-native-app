export const filterValidations = (validations, dates) => {
	return dates.filter((date) => validations[date] !== true)
}

export const filterUnvalidated = (
	validations: {},
	dates: string[]
): string[] => {
	return dates.filter((date) => !(date in validations))
}

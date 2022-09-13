export const dateToString = (date) => {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const stringDateToDay = (date) => {
	// const today = new Date(Date.now())
	const dateObject = new Date(date)
	const day = dateObject.getDay()
	switch (day) {
		case 1:
			return 'Monday'
			break
		case 2:
			return 'Tuesday'
			break
		case 3:
			return 'Wednesday'
			break
		case 4:
			return 'Thursday'
			break
		case 5:
			return 'Friday'
			break
		case 6:
			return 'Saturday'
			break
		case 0:
			return 'Sunday'
			break
	}

	// return dateObject
}

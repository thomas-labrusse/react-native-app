export const dateToISOStringNoTime = (date) => {
	const [ISOString] = date.toISOString().split('T')
	return ISOString
}

export const isToday = (date) => {
	const today = new Date()
	return (
		date.getDate() == today.getDate() &&
		date.getMonth() == today.getMonth() &&
		date.getFullYear() == today.getFullYear()
	)
}

export const isYesterday = (date) => {
	const today = new Date()
	const yesterday = new Date(today.getTime())
	yesterday.setDate(today.getDate() - 1)

	return (
		date.getDate() == yesterday.getDate() &&
		date.getMonth() == yesterday.getMonth() &&
		date.getFullYear() == yesterday.getFullYear()
	)
}

export const stringDateToDay = (date: string) => {
	const dateObject = new Date(date)
	if (isToday(dateObject)) {
		return 'Today'
	} else if (isYesterday(dateObject)) {
		return 'Yesterday'
	}
	const weekDay = dateObject.getDay()
	const month = dateObject.getMonth() + 1
	const day = dateObject.getDate()
	switch (weekDay) {
		case 1:
			return `Mon. ${month}/${day}`
			break
		case 2:
			return `Tue. ${month}/${day}`
			break
		case 3:
			return `Wed. ${month}/${day}`
			break
		case 4:
			return `Thu. ${month}/${day}`
			break
		case 5:
			return `Fri. ${month}/${day}`
			break
		case 6:
			return `Sat. ${month}/${day}`
			break
		case 0:
			return `Sun. ${month}/${day}`
			break
	}
}

export const getLastSevenDates = () => {
	const today = new Date(Date.now())

	// const currentWeekDay = today.getDay()
	let lastSevenDates = []
	for (let i = 0; i < 7; i++) {
		const day = today.getDate() - i
		// using new Date() instead of "today" because setDate changes its value
		const date = new Date(new Date().setDate(day))
		lastSevenDates.push(dateToISOStringNoTime(date))
	}
	return lastSevenDates
}

// NOTE: method below only for week validations

export const getCurrentWeekDates = () => {
	const today = new Date(Date.now())

	const currentWeekDay = today.getDay()
	let currentWeekDates = []
	for (let i = currentWeekDay; i > 0; i--) {
		const day = today.getDate() - i + 1
		// using new Date() instead of "today" because setDate changes its value
		const date = new Date(new Date().setDate(day))
		currentWeekDates.push(dateToISOStringNoTime(date))
	}
	return currentWeekDates
}

export const getPreviousWeekDates = () => {
	const today = new Date(Date.now())
	const dayOfWeek = today.getDay()
	const lastSunday = new Date(today.getTime())
	lastSunday.setDate(today.getDate() - dayOfWeek)

	let previousWeekDates = []

	for (let i = 7; i > 0; i--) {
		const day = lastSunday.getDate() - i + 1
		const date = new Date(new Date().setDate(day))
		previousWeekDates.push(dateToISOStringNoTime(date))
	}
	return previousWeekDates
}

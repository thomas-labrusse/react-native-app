import React, { useState } from 'react'
import { createContext, useEffect } from 'react'
import { database } from '../data/database'

// CONTEXT OBJECT

export const RoutineContext = createContext({
	routine: [],
	createHabit: () => {},
	deleteHabit: (id) => {},
	updateHabit: (id) => {},
	validateHabit: (id, input) => {},
})

// REDUCER

const RoutineContextProvider = ({ children }) => {
	const [myRoutine, setMyRoutine] = useState([])

	const refreshHabits = () => {
		database.getHabits(setMyRoutine)
	}

	useEffect(() => {
		refreshHabits()
	}, [database])

	const createHabit = async (habit) => {
		await database.addHabitAsync(habit, refreshHabits)
	}

	// TODO: update the updateHabit method
	const updateHabit = async (id, habit) => {
		await database.updateHabitAsync(id, habit, refreshHabits)
	}

	const deleteHabit = async (id) => {
		await database.deleteHabitAsync(id, refreshHabits)
	}

	const value = {
		routine: myRoutine,
		createHabit: createHabit,
		deleteHabit: deleteHabit,
		updateHabit: updateHabit,
	}

	return (
		<RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>
	)
}

export default RoutineContextProvider

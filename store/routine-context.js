import React, { useState } from 'react'
import { createContext, useReducer, useEffect } from 'react'
import { dummyData } from '../data/dummyData'
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

const routineReducer = (state, action) => {
	switch (action.type) {
		case 'delete_habit': {
			return state.filter((habit) => habit.id !== action.id)
		}

		case 'update_habit': {
			const index = state.findIndex((habit) => habit.id === action.id)
			const habitToUpdate = state[index]
			const updatedHabit = { ...habitToUpdate, ...action.input }
			console.log('UPDATED HABIT:', updatedHabit)
			const updatedRoutine = [...state]
			updatedRoutine[index] = updatedHabit
			return updatedRoutine
		}

		case 'validate_habit': {
			const { id, input } = action
			const index = state.findIndex((habit) => habit.id === id)

			const updatedValidations = {
				...state[index].validations,
				...input,
			}
			const updatedHabit = { ...state[index], validations: updatedValidations }
			const updatedRoutine = [...state]
			updatedRoutine[index] = updatedHabit
			console.log('Routine:', updatedRoutine)
			return updatedRoutine
		}

		default: {
			throw Error('Unknown action : ' + action.type)
		}
	}
}

const RoutineContextProvider = ({ children }) => {
	// const [myRoutine, dispatch] = useReducer(routineReducer, dummyData)

	// NEW
	const [myRoutine, setMyRoutine] = useState(dummyData)

	// NEW
	const refreshHabits = () => {
		database.getHabits(setMyRoutine)
	}

	// NEW
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
	// const deleteHabit = (id) => {
	// 	dispatch({
	// 		type: 'delete_habit',
	// 		id: id,
	// 	})
	// }

	// const updateHabit = (id, input) => {
	// 	dispatch({
	// 		type: 'update_habit',
	// 		id: id,
	// 		input: input,
	// 	})
	// }

	const validateHabit = (id, input) => {
		dispatch({
			type: 'validate_habit',
			id: id,
			input: input,
		})
	}

	const value = {
		routine: myRoutine,
		createHabit: createHabit,
		deleteHabit: deleteHabit,
		updateHabit: updateHabit,
		validateHabit: validateHabit,
	}

	return (
		<RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>
	)
}

export default RoutineContextProvider

import { createContext, useReducer } from 'react'
import React from 'react'
import { dummyData } from '../data/dummyData'

export const RoutineContext = createContext({
	routine: [],
	createHabit: () => {},
	deleteHabit: (id) => {},
	updateHabit: (id) => {},
	validateHabit: (id, input) => {},
})

const routineReducer = (state, action) => {
	switch (action.type) {
		case 'create_habit': {
			const id = new Date().toString() + Math.random().toString()
			return [...state, { ...action.habit, id: id }]
		}
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
	const [myRoutine, dispatch] = useReducer(routineReducer, dummyData)

	const createHabit = (habit) => {
		dispatch({
			type: 'create_habit',
			habit: habit,
		})
	}
	const deleteHabit = (id) => {
		dispatch({
			type: 'delete_habit',
			id: id,
		})
	}
	const updateHabit = (id, input) => {
		dispatch({
			type: 'update_habit',
			id: id,
			input: input,
		})
	}

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

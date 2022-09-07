import { createContext, useState, useReducer } from 'react'
import React from 'react'
import { dummyData } from '../data/dummyData'

export const RoutineContext = createContext({
	routine: [],
	createHabit: () => {},
	deleteHabit: (id) => {},
	updateHabit: (id) => {},
})

const routineReducer = (state, action) => {
	switch (action.type) {
		case 'create_habit': {
			const id = new Date().toString() + Math.random().toString()
			return [...state, { ...action.habit, id: id }]
			// setMyRoutine((curRoutine) => [...curRoutine, habit])
		}
		case 'delete_habit': {
			// setMyRoutine((curRoutine) => curRoutine.filter((habit) => habit.id !== id))
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

		default:
			{
				throw Error('Unknown action : ' + action.type)
			}
			break
	}
}

const RoutineContextProvider = ({ children }) => {
	const [myRoutine, dispatch] = useReducer(routineReducer, dummyData)
	// const [myRoutine, setMyRoutine] = useState(dummyData)

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

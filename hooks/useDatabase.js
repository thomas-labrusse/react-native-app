// force the state to clear with fast refresh in Expo
// @refresh reset

import React, { useEffect, useState } from 'react'

import { database } from '../data/database'

const useDatabase = () => {
	const [isDBLoadingComplete, setIsDBLoadingComplete] = useState(false)

	useEffect(() => {
		const loadDataAsync = async () => {
			try {
				console.log('getting here')
				// NOTE: Development purposes only
				await database.dropDatabaseTablesAsync()

				// NOTE: Keep for production
				await database.setupDatabaseAsync()

				// NOTE: Development purposes only
				await database.setupFirstHabitAsync()
				await database.setupFirstValidationAsync()

				setIsDBLoadingComplete(true)
			} catch (error) {
				console.log('Getting an error on loading data')
				console.warn(error)
			}
		}

		loadDataAsync()
	}, [])

	return isDBLoadingComplete
}

export default useDatabase

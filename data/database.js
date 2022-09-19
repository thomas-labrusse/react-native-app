import React from 'react'

import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.db')

const getHabits = (successFunc) => {
	db.transaction(
		(tx) => {
			tx.executeSql(`SELECT * FROM habits`, [], (_, { rows: { _array } }) => {
				successFunc(_array)
				console.log('NEW TABLE UPDATED:', _array)
			})
		},
		(_, error) => {
			console.log('db error when loading habits')
			console.log(error)
		},
		(_, _success) => {
			console.log('loaded habits')
		}
	)
}

const getValidations = (habitid, successFunc) => {
	console.log('Getting validation for ID:', habitid)
	db.transaction(
		(tx) => {
			tx.executeSql(
				`SELECT * FROM validations WHERE habitid = ?`,
				[habitid],
				(_, { rows: { _array } }) => {
					console.log('loading validations :', _array)
					successFunc(_array)
					console.log('NEW VALIDATIONS UPDATED:', _array)
				}
			)
		},
		(_, error) => {
			console.log('db error load validations')
			console.log(error)
		},
		(_, _success) => {
			console.log('loaded validations')
		}
	)
}

// TODO: update habit in DB function

const setupDatabaseAsync = async () => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`CREATE TABLE IF NOT EXISTS habits (habitid INTEGER PRIMARY KEY NOT NULL, description TEXT NOT NULL, category TEXT CHECK(category IN ('productivity', 'health', 'family/friends')) NOT NULL, why TEXT NOT NULL, frequency TEXT CHECK( frequency IN ('day', 'week')) NOT NULL, reps INTEGER NOT NULL)`
				)
				tx.executeSql(
					`CREATE TABLE IF NOT EXISTS validations (validationid INTEGER PRIMARY KEY NOT NULL, validationdate TEXT, validationcheck TEXT, habitid INTEGER NOT NULL, FOREIGN KEY(habitid) REFERENCES habits(habitid) ON DELETE CASCADE)`
				)
			},
			(_, error) => {
				console.log('db error creating tables')
				console.log(error)
				reject(error)
			},
			(_, success) => {
				console.log('DB successfully setted up with 2 tables')
				resolve(success)
			}
		)
	})
}

const dropDatabaseTablesAsync = async () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'DROP TABLE IF EXISTS validations',
				[],
				(_, result) => {
					console.log('Validations table successfully dropped')
					resolve(result)
				},
				(_, error) => {
					console.log('error dropping validations table')
					reject(error)
				}
			)
			tx.executeSql(
				'DROP TABLE IF EXISTS habits',
				[],
				(_, result) => {
					console.log('Habits table successfully dropped')
					resolve(result)
				},
				(_, error) => {
					console.log('error dropping habits table')
					reject(error)
				}
			)
		})
	})
}

const setupFirstHabitAsync = async () => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`INSERT INTO habits(habitid, description, category, why, frequency, reps) VALUES(?,?,?,?,?,?)`,
					[
						1,
						'my first habit from db',
						'productivity',
						'make sure the DB works properly',
						'day',
						1,
					]
				)
			},
			(_, error) => {
				console.log('DB error insert first habit')
				console.log(error)
				resolve()
			},
			(_, success) => {
				console.log('First habit setup successful')
				resolve(success)
			}
		)
	})
}
const setupFirstValidationAsync = async () => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`INSERT INTO validations(validationid, validationdate, validationcheck, habitid) VALUES(?,?,?,?)`,
					[1, '2022-09-15', 'true', 1]
				)
			},
			(_, error) => {
				console.log('DB error insert first validation')
				console.log(error)
				resolve()
			},
			(_, success) => {
				console.log('First validation setup successful')
				resolve(success)
			}
		)
	})
}

const addHabitAsync = async (habit, successFunc) => {
	return new Promise((resolve, reject) => {
		console.log('Trying to add new habit:', habit)
		db.transaction(
			(tx) => {
				tx.executeSql(
					`INSERT INTO habits(description, category, why, frequency, reps) VALUES(?,?,?,?,?)`,
					[
						habit.description,
						habit.category,
						habit.why,
						habit.frequency,
						habit.reps,
					]
				)
			},
			(_, error) => {
				console.log('DB error on creating new habit')
				console.log(error)
				reject(error)
			},
			(_, success) => {
				// Success function = refresh context state base on current DB
				successFunc()
				console.log('New habit created successfully')
				resolve(success)
			}
		)
	})
}

const deleteHabitAsync = async (id, successFunc) => {
	return new Promise((resolve, reject) => {
		console.log('Trying to delete new habit:', id)
		db.transaction(
			(tx) => {
				tx.executeSql(
					`DELETE FROM habits WHERE habitid = ?`,
					[id],
					(_, result) => {
						console.log('Habit element successfully deleted')
						resolve(result)
					},
					(_, error) => {
						console.log('error deleting habit element')
						console.log('Error log:', error)
						reject(error)
					}
				)
			},
			(_, error) => {
				console.log('DB error on deleting habit with id:', id)
				console.log(error)
				reject(error)
			},
			(_, success) => {
				// Success function = refresh context state base on current DB
				successFunc()
				console.log('Habit with id :' + id + 'deleted')
				resolve(success)
			}
		)
	})
}

export const database = {
	getHabits,
	getValidations,
	setupDatabaseAsync,
	setupFirstHabitAsync,
	setupFirstValidationAsync,
	dropDatabaseTablesAsync,
	addHabitAsync,
	deleteHabitAsync,
}

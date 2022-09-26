import React from 'react'

import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.db')

// Allowing foreign keys, to delete all validations on habit deletion
db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
	console.log('Foreign keys turned on')
)

// ##################### NOTE: TABLES SETUP ###############################

const setupDatabaseAsync = async () => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`CREATE TABLE IF NOT EXISTS habits (habitid INTEGER PRIMARY KEY NOT NULL, description TEXT NOT NULL, category TEXT CHECK(category IN ('productivity', 'health', 'family/friends')) NOT NULL, why TEXT NOT NULL, frequency TEXT CHECK( frequency IN ('day', 'week')) NOT NULL, reps INTEGER NOT NULL, start TEXT NOT NULL)`
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

// ##################### NOTE: HABITS SETUP ###############################

const addHabitAsync = async (habit, successFunc) => {
	return new Promise((resolve, reject) => {
		console.log('Trying to add new habit:', habit)
		db.transaction(
			(tx) => {
				tx.executeSql(
					`INSERT INTO habits(description, category, why, frequency, reps, start) VALUES(?,?,?,?,?,?)`,
					[
						habit.description,
						habit.category,
						habit.why,
						habit.frequency,
						habit.reps,
						habit.start,
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

const getHabits = (successFunc) => {
	db.transaction(
		(tx) => {
			tx.executeSql(`SELECT * FROM habits`, [], (_, { rows: { _array } }) => {
				successFunc(_array)
			})
		},
		(_, error) => {
			console.log('db error when loading habits')
			console.log(error)
		},
		(_, _success) => {
			// console.log('loaded habits')
		}
	)
}

// TODO: update habit in DB function

const updateHabitAsync = async (id, habit, successFunc) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					'UPDATE habits SET habitid = ?, description = ?, category = ?, why = ?, frequency = ?, reps=?, start = ? WHERE habitid = ?',
					[
						id,
						habit.description,
						habit.category,
						habit.why,
						habit.frequency,
						habit.reps,
						habit.start,
						id,
					]
				)
			},
			(_, error) => {
				console.log('ERROR:', error)
				reject(error)
			},
			(_, success) => {
				successFunc()
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

// ##################### NOTE: VALIDATIONS SETUP ###############################

const addValidationAsync = async (habitid, input, successFunc) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`INSERT INTO validations(validationdate, validationcheck, habitid) VALUES(?,?,?)`,
					[input.date, input.check, habitid]
				)
			},
			(_, error) => {
				reject(error)
			},
			(_, success) => {
				successFunc()
				resolve(success)
			}
		)
	})
}

const getValidations = (habitid, successFunc) => {
	db.transaction(
		(tx) => {
			tx.executeSql(
				`SELECT * FROM validations WHERE habitid = ?`,
				[habitid],
				(_, { rows: { _array } }) => {
					console.log('loading validations :', _array)
					successFunc(_array)
					// console.log('NEW VALIDATIONS UPDATED:', _array)
				}
			)
		},
		(_, error) => {
			console.log('db error load validations')
			console.log(error)
		},
		(_, _success) => {
			// console.log('loaded validations')
		}
	)
}

const getXValidations = (habitid, x, successFunc) => {
	db.transaction(
		(tx) => {
			tx.executeSql(
				`SELECT * FROM validations WHERE habitid = ? ORDER BY validationdate DESC LIMIT ?`,
				[habitid, x],
				(_, { rows: { _array } }) => {
					// console.log('loading validations :', _array)
					successFunc(_array)
					// console.log('NEW VALIDATIONS UPDATED:', _array)
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

// ################# NOTE: DEVELOPMENT ONLY ########################

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
					`INSERT INTO habits(habitid, description, category, why, frequency, reps, start) VALUES(?,?,?,?,?,?,?)`,
					[
						1,
						'Wake up every morning at 6am.',
						'productivity',
						'Have the time to workout in the morning',
						'day',
						1,
						'2022-08-01',
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

const setupSecondHabitAsync = async () => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`INSERT INTO habits(habitid, description, category, why, frequency, reps, start) VALUES(?,?,?,?,?,?,?)`,
					[
						2,
						'Work out for 30 minutes.',
						'health',
						'To be fit as a fiddle, feel alert and ready.',
						'week',
						5,
						'2022-08-28',
					]
				)
			},
			(_, error) => {
				console.log('DB error insert second habit')
				console.log(error)
				resolve()
			},
			(_, success) => {
				console.log('Second habit setup successful')
				resolve(success)
			}
		)
	})
}
const setupThirdHabitAsync = async () => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`INSERT INTO habits(habitid, description, category, why, frequency, reps, start) VALUES(?,?,?,?,?,?,?)`,
					[
						3,
						'Stretch for 10 minutes.',
						'health',
						'To touch my toes.',
						'week',
						1,
						'2022-08-25',
					]
				)
			},
			(_, error) => {
				console.log('DB error insert third habit')
				console.log(error)
				resolve()
			},
			(_, success) => {
				console.log('third habit setup successful')
				resolve(success)
			}
		)
	})
}
const setupForthHabitAsync = async () => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`INSERT INTO habits(habitid, description, category, why, frequency, reps, start) VALUES(?,?,?,?,?,?,?)`,
					[
						4,
						'Catch up with a friend.',
						'family/friends',
						'Stay in touch with friends.',
						'week',
						1,
						'2022-08-28',
					]
				)
			},
			(_, error) => {
				console.log('DB error insert third habit')
				console.log(error)
				resolve()
			},
			(_, success) => {
				console.log('third habit setup successful')
				resolve(success)
			}
		)
	})
}
const setupFifthHabitAsync = async () => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`INSERT INTO habits(habitid, description, category, why, frequency, reps, start) VALUES(?,?,?,?,?,?,?)`,
					[
						5,
						'Eat an apple.',
						'family/friends',
						'Keep the doctor away.',
						'day',
						1,
						'2022-09-01',
					]
				)
			},
			(_, error) => {
				console.log('DB error insert third habit')
				console.log(error)
				resolve()
			},
			(_, success) => {
				console.log('third habit setup successful')
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
					[1, '2022-08-01', 'true', 1]
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

// #######################################################################

export const database = {
	setupDatabaseAsync,
	addHabitAsync,
	getHabits,
	updateHabitAsync,
	deleteHabitAsync,
	addValidationAsync,
	getValidations,
	getXValidations,
	setupFirstHabitAsync,
	setupSecondHabitAsync,
	setupThirdHabitAsync,
	setupForthHabitAsync,
	setupFifthHabitAsync,
	setupFirstValidationAsync,
	dropDatabaseTablesAsync,
}

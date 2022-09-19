export const dummyData = [
	{
		id: 'r1',
		description: 'Wake up at 6am',
		category: 'productivity',
		why: 'Having the time to workout and/or work on personal projects',
		frequency: 'day',
		reps: '1',
		validations: {
			'2022-09-01': true,
			'2022-09-02': false,
			'2022-09-03': true,
			'2022-09-04': true,
		},
	},
	{
		id: 'r2',
		description: 'Work-out for 30min',
		category: 'health',
		why: 'Staying in good shape, feel more relaxed, be stronger, live longer',
		frequency: 'day',
		reps: '1',
		startDate: '2022-09-01',
		validations: {
			'2022-09-01': true,
			'2022-09-02': false,
			'2022-09-03': true,
			'2022-09-04': true,
		},
	},
	{
		id: 'r3',
		description: 'Go to bed early',
		category: 'productivity',
		why: 'Being alert during the day',
		frequency: 'day',
		reps: '1',
		validations: {
			'2022-09-01': true,
			'2022-09-02': false,
			'2022-09-03': true,
			'2022-09-04': true,
		},
	},
	{
		id: 'r4',
		description: 'Eat one apple',
		category: 'health',
		why: 'to keep the doctor away !',
		frequency: 'day',
		reps: '1',
		validations: {
			'2022-09-01': true,
			'2022-09-02': false,
			'2022-09-03': true,
			'2022-09-04': true,
		},
	},
	{
		id: 'r5',
		description: 'Spend one evening to work on a personal project',
		category: 'productivity',
		why: 'Build something meaningful, avoid screens for sole entertainment purposes',
		frequency: 'week',
		reps: '2',
		validations: {
			'2022-09-01': true,
			'2022-09-02': false,
			'2022-09-03': true,
			'2022-09-04': true,
		},
	},
	{
		id: 'r6',
		description: 'Play with Emily',
		category: 'family/friends',
		why: 'Bond with my daughter',
		frequency: 'week',
		reps: '5',
		validations: {
			'2022-09-01': true,
			'2022-09-02': false,
			'2022-09-03': true,
			'2022-09-04': true,
		},
	},
	{
		id: 'r7',
		description: 'Go out to have a coffee with Steph and Emily',
		category: 'family/friends',
		why: 'Be close to my family',
		frequency: 'week',
		reps: '1',
		validations: {
			'2022-09-01': false,
			'2022-09-02': false,
			'2022-09-03': false,
			'2022-09-04': false,
		},
	},
	{
		id: 'r8',
		description: 'Strech for 10 minutes',
		category: 'health',
		why: 'Avoid injuries, being less stiff, move freely',
		frequency: 'week',
		reps: '1',
		validations: {
			'2022-09-01': true,
			'2022-09-02': false,
			'2022-09-03': true,
			'2022-09-04': false,
		},
	},
	{
		id: 'r9',
		description: 'Keep track of my finances',
		category: 'productivity',
		why: 'Stay on track for the 2030 plan',
		frequency: 'week',
		reps: '1',
		validations: {
			'2022-09-01': false,
			'2022-09-02': false,
			'2022-09-03': false,
			'2022-09-04': false,
		},
	},
	{
		id: 'r10',
		description: 'Go for a long walk (>2h)',
		category: 'health',
		why: 'Unwind and have the time to reflect ',
		frequency: 'week',
		reps: '1',
		validations: {
			'2022-09-01': false,
			'2022-09-02': false,
			'2022-09-03': false,
			'2022-09-04': true,
		},
	},
]

const habits = [
	{
		id: 'r1',
		description: 'Wake up at 6am',
		category: 'productivity',
		why: 'Having the time to workout and/or work on personal projects',
		frequency: 'day',
		reps: '1',
	},
]

const validations = [
	{ habitId: 'r1', date: '2022-09-01', value: true },
	{ habitId: 'r2', date: '2022-09-02', value: true },
]

const parsedValidationsForOneHabit = {
	'2022-09-01': true,
	'2022-09-02': true,
}

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Colors } from './constants/colors'

// SCREENS
import MyRoutineScreen from './screens/MyRoutineScreen'
import HabitDetailsScreen from './screens/HabitDetailsScreen'

// DATA
import RoutineContextProvider from './store/routine-context'

// NAVIGATION
const Stack = createNativeStackNavigator()

const MyTheme = {
	dark: false,
	colors: {
		primary: Colors.primary500,
		background: '#fff',
		card: '#fff',
		text: Colors.primary500,
		border: 'rgb(199, 199, 204)',
		notification: 'rgb(255, 69, 58)',
	},
}

// APP
export default function App() {
	return (
		<>
			<StatusBar style='auto' />
			<RoutineContextProvider>
				<View style={styles.appContainer}>
					<NavigationContainer theme={MyTheme}>
						<Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
							<Stack.Screen
								name='My Routine'
								options={{ headerShadowVisible: false }}
								component={MyRoutineScreen}
							/>
							<Stack.Screen
								name='My Habit'
								component={HabitDetailsScreen}
								options={{
									presentation: 'modal',
								}}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</View>
			</RoutineContextProvider>
		</>
	)
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		paddingTop: 28,
	},
})

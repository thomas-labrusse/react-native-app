import { Modal } from 'react-native'
import HabitForm from './HabitForm'

const EditHabitModal = ({ isVisible, onClose, myHabit }) => {
	return (
		<Modal visible={isVisible} animationType='slide'>
			<HabitForm
				submitButtonLabel={'Update'}
				isEditing={true}
				onCancel={onClose}
				defaultValues={myHabit}
			/>
		</Modal>
	)
}

export default EditHabitModal

import { Modal } from 'react-native'
import HabitForm from './HabitForm'

const AddHabitModal = ({ isVisible, onClose }) => {
	return (
		<Modal visible={isVisible} animationType='slide'>
			<HabitForm
				submitButtonLabel={'Add'}
				isEditing={false}
				onCancel={onClose}

				// onSubmit={}
			/>
		</Modal>
	)
}

export default AddHabitModal

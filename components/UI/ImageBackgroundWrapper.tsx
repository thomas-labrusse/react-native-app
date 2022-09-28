import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
const image = require('../../assets/images/checkmark-outline-4.png')

interface ImageBackgroundWrapperProps {
	isChecked: boolean
	children?: React.ReactNode
}

const ImageBackgroundWrapper = ({
	isChecked,
	children,
}: ImageBackgroundWrapperProps) => {
	return (
		<>
			{isChecked ? (
				<ImageBackground
					source={image}
					imageStyle={{
						opacity: 0.13,
						resizeMode: 'center',
					}}
					style={styles.image}
				>
					{children}
				</ImageBackground>
			) : (
				<>{children}</>
			)}
		</>
	)
}

export default ImageBackgroundWrapper

const styles = StyleSheet.create({
	image: {
		flex: 1,
		overflow: 'hidden',
	},
})

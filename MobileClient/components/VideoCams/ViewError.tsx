import { Text } from 'react-native'

interface ViewErrorProps {
	name: string | undefined
}

const ViewError = (props: ViewErrorProps) => {
	console.log("ViewError()");
	
	return (
		<>
			<Text>{props.name}</Text>
		</>
	)
}

export default ViewError
import { Text } from 'react-native'

interface ViewErrorProps {
    name: string | undefined
}

const ViewError = (props: ViewErrorProps) => {
    return (
        <>
            <Text>{props.name}</Text>
        </>
    )
}

export default ViewError
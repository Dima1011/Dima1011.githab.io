import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage.js/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';



const setContent = (process, char) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <View char={char}/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}
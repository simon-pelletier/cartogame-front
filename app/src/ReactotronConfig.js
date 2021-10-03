import Reactotron from 'reactotron-react-js';
import {reactotronRedux} from 'reactotron-redux';

const reactotron = Reactotron
    .configure({name: 'Cartographers'})
    .use(reactotronRedux({
        isActionImportant: action => action.type === 'repo.receive'
    }))
    .connect();

export default reactotron;
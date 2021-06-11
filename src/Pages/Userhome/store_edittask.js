import {createStore} from 'redux';

import reducer_edittask from './reducer_edittask';

const store_edittask = createStore(reducer_edittask);

export default store_edittask;
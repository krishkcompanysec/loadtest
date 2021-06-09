import {createStore} from 'redux';

import reducer_delete from './reducer_delete';

const store_delete = createStore(reducer_delete);

export default store_delete;
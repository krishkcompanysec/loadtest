import {createStore} from 'redux';

import reducer_groups from './reducer_groups';

const store_groups = createStore(reducer_groups);

export default store_groups;
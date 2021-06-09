import {createStore} from 'redux';

import reducer_survey from './reducer_survey';

const store_survey = createStore(reducer_survey);

export default store_survey;
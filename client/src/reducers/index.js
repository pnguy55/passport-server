import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import deleteSurveyReducer from './deleteSurveyReducer';

// combines the reducers to create the full state
export default combineReducers({
    // auth piece of state is produced by authReducer
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer || deleteSurveyReducer
});
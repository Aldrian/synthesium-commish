import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import user from './user';
import ui from './ui';
import commissions from './commissions';

export default combineReducers({
	routing: routerReducer,
	user,
	ui,
	commissions,
});

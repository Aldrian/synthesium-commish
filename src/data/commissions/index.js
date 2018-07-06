import {request} from 'graphql-request';
import {
	createCommission
} from '../queries';
import {
	GRAPHQL_API,
} from '../constants';

export const CREATING_COMMISSION = 'user/CREATING_COMMISSION';
export const CREATED_COMMISSION = 'user/CREATED_COMMISSION';
export const CREATING_COMMISSION_ERROR = 'user/CREATING_COMMISSION_ERROR';

const initialState = {
    creatingCommission: false,
    creatingCommissionError: false,
    commissionCreated: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATING_COMMISSION:
			return {
                ...state,
                commissionCreated: false,
                creatingCommission: true,
                creatingCommissionError: false,
        }
        case CREATED_COMMISSION:
			return {
				...state,
                creatingCommission: false,
                creatingCommissionError: false,
                commissionCreated: true,
        }
        case CREATING_COMMISSION_ERROR:
			return {
				...state,
                creatingCommission: false,
                creatingCommissionError: true,
                commissionCreated: false,
        }
		default:
			return state;
	}
};

export const createRequest = (email, option, extras, messageData) => (dispatch) => {
    dispatch({
		type: CREATING_COMMISSION,
	});
    request(GRAPHQL_API, createCommission(email, option, extras, messageData))
      .then((data) => {
        dispatch({
            type: CREATED_COMMISSION,
        });
      })
      .catch((err) => {
        dispatch({
            type: CREATING_COMMISSION_ERROR,
        });
        console.log(err)
      }) 
}

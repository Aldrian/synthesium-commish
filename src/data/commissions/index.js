import {request} from 'graphql-request';
import {push} from 'react-router-redux';
import {
    createCommission,
    getCommissionData,
    sendMessageMutation,
    getAllCommissionsQuery,
    updateCommissionStatusMutation
} from '../queries';
import {
	GRAPHQL_API,
} from '../constants';

export const CREATING_COMMISSION = 'commission/CREATING_COMMISSION';
export const CREATED_COMMISSION = 'commission/CREATED_COMMISSION';
export const CREATING_COMMISSION_ERROR = 'commission/CREATING_COMMISSION_ERROR';
export const GET_COMMISSION = 'commission/GET_COMMISSION';
export const GET_ALL_COMMISSIONS = 'commission/GET_ALL_COMMISSIONS';

const initialState = {
    creatingCommission: false,
    creatingCommissionError: false,
    commissionCreated: false,
    messages: [],
    commissions: [],
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
        case GET_COMMISSION:
        return {
            ...state,
            messages: action.data.messages,
        }
        case GET_ALL_COMMISSIONS:
        return {
            ...state,
            commissions: action.commissions,
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

export const sendMessage = (commissionID, messageData) => (dispatch) => {
    dispatch({
		type: CREATING_COMMISSION,
	});
    request(GRAPHQL_API, sendMessageMutation(commissionID, messageData))
      .then((data) => {
        dispatch({
            type: CREATED_COMMISSION,
        });
        dispatch(getCommission(commissionID));
      })
      .catch((err) => {
        dispatch({
            type: CREATING_COMMISSION_ERROR,
        });
        console.log(err)
      }) 
}

export const updateCommissionStatus = (commissionID, status) => (dispatch) => {
    request(GRAPHQL_API, updateCommissionStatusMutation(commissionID, status))
      .then((data) => {
        dispatch(getAllCommissions());
      })
      .catch((err) => {
        console.log(err)
      }) 
}

export const getCommission = (id) => (dispatch) => {
    request(GRAPHQL_API, getCommissionData(id))
      .then((data) => {
        if (data.Commission) {
            dispatch({
                type: GET_COMMISSION,
                data: data.Commission,
            });
        }
        else {
            dispatch(push('/'));
        }
      })
      .catch((err) => {
        dispatch(push('/'));
        console.log(err);
      }) 
}

export const getAllCommissions = (id) => (dispatch) => {
    request(GRAPHQL_API, getAllCommissionsQuery())
      .then((data) => {
        if (data.allCommissions) {
            dispatch({
                type: GET_ALL_COMMISSIONS,
                commissions: data.allCommissions,
            });
        }
        else {
            dispatch(push('/'));
        }
      })
      .catch((err) => {
        dispatch(push('/'));
        console.log(err);
      }) 
}

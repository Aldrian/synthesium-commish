import {push} from 'react-router-redux';
import {request, GraphQLClient} from 'graphql-request';
import {setStable} from '../ui';
import {
	authenticateUser,
	signupUser,
} from '../queries';
import {
	GRAPHQL_API,
} from '../constants';

export const STORE_USER_EMAIL = 'user/STORE_USER_EMAIL';
export const LOGIN_ERROR = 'user/LOGIN_ERROR';
export const LOGOUT = 'user/LOGOUT';
export const CONNECT_TO_GRAPHCOOL = 'user/CONNECT_TO_GRAPHCOOL';
const initialState = {
	email: '',
	graphqlID: undefined,
	shouldLogout: false,
	graphQLToken: undefined,
	authError: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case STORE_USER_EMAIL:
			return {
				...state,
				email: action.email,
				graphqlID: action.graphqlID,
			};

		case CONNECT_TO_GRAPHCOOL:
			return {
				...state,
				graphqlID: action.graphqlID,
				email: action.email,
				graphQLToken: action.graphQLToken,
				authError: '',
			};

		case LOGOUT:
			return {
				...state,
				email: '',
				exportType: undefined,
				graphqlID: undefined,
				graphQLToken: undefined,
				shouldLogout: false,
      };

		case LOGIN_ERROR:
			return {
				...state,
				authError: action.authError,
      };

		default:
			return state;
	}
};


export const logout = () => (dispatch) => {
	localStorage.removeItem('uniqueGraphcoolToken');
	dispatch({
		type: LOGOUT,
	});
};

export const loginWithEmail = (email, password, token) => (dispatch) => {
	const client = new GraphQLClient(GRAPHQL_API, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	client
		.request(authenticateUser(email, password))
		.then((res) => {
			dispatch(loginToGraphCool(res.authenticateEmailUser.token));
		})
		.catch((err) => {
			dispatch({
				type: LOGIN_ERROR,
				authError: err.response.errors[0].functionError,
			});
		});
};

export const signupWithEmail = (
	email,
	password,
	firstName,
	lastName,
	token,
) => (dispatch) => {
	const client = new GraphQLClient(GRAPHQL_API, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	client.request(signupUser(email, password, firstName, lastName)).then(() => {
		dispatch(loginWithEmail(email, password));
	});
};


export const loginToGraphCool = (accessToken, shouldRedirect = true) => (
	dispatch,
	getState,
) => {
	localStorage.setItem('uniqueGraphcoolToken', accessToken);
	const client = new GraphQLClient(GRAPHQL_API, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	client
		.request()
		.then((res) => {
			dispatch({
				type: CONNECT_TO_GRAPHCOOL,
				email: res.user.email,
				graphqlID: res.user.id,
				graphQLToken: accessToken,
				shouldLogout: false,
			});
		})
		.catch(() => {
			dispatch({
				type: CONNECT_TO_GRAPHCOOL,
				email: undefined,
				graphQLToken: undefined,
				graphqlID: undefined,
				shouldLogout: true,
			});
		});
};

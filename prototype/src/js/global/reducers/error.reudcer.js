import createReducer from 'restack-core/lib/utils/createReducer'

const ERROR = "REQUEST_STATUS_ERROR"

const error = createReducer(null,{
	[ERROR](state, action){
		console.log('network error:'+action.status);
		switch (action.status) {
			default:
			  return null
		}
	},
});

export default {error};
